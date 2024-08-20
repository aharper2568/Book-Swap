const express = require('express');
const router = express.Router();
const { searchBooks } = require('../../utils/googleBooks');
const { Swap, Book, User } = require('../../models')
const withAuth = require('../../utils/auth');

// post request to SEARCH
router.post('/search', withAuth, async (req, res) => {
  const { query } = req.body;

  try {
    const books = await searchBooks(query);
    console.log('books retrieved');
    res.status(200).json(books)
  } catch (err) {
    console.error('no books??', err);
  }
})

//post request to ADD A BOOK TO COLLECTION
router.post('/user/:id', withAuth, async (req, res) => {
  const { title, author, coverImageUrl, googleBooksId, userId } = req.body;

  try {
    const newBook = await Book.create({
      title,
      author,
      coverImageUrl,
      googleBooksId,
      userId,
    });

    res.status(201).json(newBook);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add book to collection' });
  }
});

router.get('/', async (req, res) => {
  try {
    const books = await Book.findAll();
    res.status(200).json(books)
  } catch (err) {

  }
})

// get request to find books by user
router.get('/user/:id', withAuth, async (req, res) => {
  try {
    const books = await Book.findByPk(req.params.id, {

    });
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ error: 'No books associated with this user' });
  }
});

router.post('/exchange', async (req, res) => {
  const { currentOwnerId, bookId } = req.body;


  try {
    const book = await Book.findByPk(bookId);

    if (book.userId !== Number(currentOwnerId)) {
      return res.status(400).json({ success: false, message: 'Invalid user or book IDs' });
    }

    await book.update({ userId: Number(req.session.user_id) });
    await book.save();

    await Swap.create({
      lenderId: currentOwnerId,
      borrowerId: req.session.user_id,
      bookId: bookId,
    });

    res.status(200).json({ book })
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try{
const book = await Book.findByPk(req.params.id);
if (book.userId === req.session.user_id) {
  await book.destroy();
  console.log('book deleted')
}
  } catch(err) {

  }
})
module.exports = router;