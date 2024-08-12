const axios = require('axios')

const searchBooks = async (query) => {
  const apiKey = proncess.env.GOOGLE_BOOKS_API_KEY;
  const url = `https://www.googleapis.com/books/v1/volumes?q=${(query)}&key=AIzaSyBdbftoxdcWYWl4ON9k2FvCpKhwnlFNHIA`

  try {
    const response = await axios.get(url);
    return console.log(response.data.items); //test to show search results
  } catch (err){
    console.error('there as an error', err)
  }
}

module.exports = { searchBooks };