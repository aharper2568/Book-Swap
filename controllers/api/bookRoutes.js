const express = require('express');
const router = express.Router();
const { searchBooks } = require('../../utils/googleBooks');

// post request
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

module.exports = router;