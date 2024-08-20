const axios = require('axios')

const searchBooks = async (query) => {
  const apiKey = process.env.GOOGLE_BOOKS_API_KEY;
  const url = `https://www.googleapis.com/books/v1/volumes?q=${(query)}&key=${apiKey}`

  try {
    const response = await axios.get(url);
    pageRes = response.data.items.map(item => ({
      googleBooksId: item.id,
      title: item.volumeInfo.title,
      author: item.volumeInfo.authors ? item.volumeInfo.authors.join(', ') : 'idk',
      coverImageUrl: item.volumeInfo.imageLinks.thumbnail,
      
    }))
    console.log(response.data.items); //test to show search results
    return pageRes;
  } catch (err){
    console.error('there as an error', err)
  }
}

module.exports = { searchBooks };