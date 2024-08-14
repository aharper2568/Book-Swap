const express = require('express');
const router = express.Router();
const { searchBooks } = require('../../utils/googleBooks');
const { Book } = require('../../models')

// post request to SEARCH
router.post('/search', async (req,res) => {
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
router.post('/', async (req, res) => {
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
module.exports = router;