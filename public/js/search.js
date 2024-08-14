document.getElementById('search-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  const query = document.getElementById('search-query').value.trim();
  if (query) {
    try{
      const response = await fetch('/api/books/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });
      if (response.ok) {
        const books = await response.json();
        displaySearchResults(books)
        console.log('Retrieved books');
        console.log(books)
      } else {
        console.error('couldnt fetch books')
      }
    } catch (err){
      console.error('failed to fetch', err)
    }
  }
});

function displaySearchResults(books) {
  const searchResults = document.getElementById('search-results');
  searchResults.innerHTML = '';

  if (books.length === 0) {
    searchResults.innerHTML = `<p>no books :/</p>`;
    return;
  }

  books.forEach(book => {
    const bookElement = document.createElement('div');
    bookElement.className ='book';

    bookElement.innerHTML = `
    <img src="${book.coverImageUrl}" alt="${book.title}">
    <h3>${book.title}</h3>
    <p>Author: ${book.author}</p>
    `;

    searchResults.appendChild(bookElement);
  })
}