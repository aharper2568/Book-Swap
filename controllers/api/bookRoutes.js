const express = require('express');
const router = express.Router();
const { searchBooks } = require('../../utils/googleBooks');
const { Book, User } = require('../../models')

// post request to SEARCH
router.post('/search', async (req, res) => {
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
router.post('/user/:id', async (req, res) => {
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
router.get('/user/:id', async (req, res) => {
  try {
    const books = await Book.findByPk(req.params.id, {

    });
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ error: 'No books associated with this user' });
  }
});

router.post('/', async (req, res) => {
  const { newOwnerId, currentOwnerId, bookId } = req.body;

  try {
      const book = await Book.findByPk(bookId);
      //const sourceUser = await User.findById(sourceUserId);
      //const targetUser = await User.findById(targetUserId);

      if (book.userId !== currentOwnerId) {
          return res.status(400).json({ success: false, message: 'Invalid user or book IDs' });
      }

      //if (!book.owner.equals(sourceUser._id)) {
      //    return res.status(400).json({ success: false, message: 'The book does not belong to the source user' });
      //}

      //sourceUser.bookCollection.pull(book._id);
      //await sourceUser.save();
//
      //targetUser.bookCollection.push(book._id);
      //await targetUser.save();

      await book.update({ userId: newOwnerId });

      res.json({ success: true });
      res.render('trade')
  } catch (err) {
      res.status(500).json(err);
  }
});
//delete route to delete a users books
//router.delete('/user/:id', async (req, res) => {
//  try {
//    const deleteBook = await Book.destroy({
//      where: {
//        id: req.params.userId
//      }
//    });
//    res.status(200).json(deleteBook);
//  } catch (err) {
//    res.status(500).json(err);
//  }
//})
module.exports = router;