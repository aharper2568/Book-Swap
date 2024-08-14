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
    <button id="add-book-btn"> Add Book to Collection </button>
    `;

    searchResults.appendChild(bookElement);
  })
}

async function addBook(googleBooksId, title, author, coverImageUrl) {
  googleBooksId = book.googleBooksId;
  title = book.title;
  author = book.author
  coverImageUrl = book.coverImageUrl
  const response = await fetch('/api/books', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ googleBooksId,title,author, coverImageUrl, userId }),
  });
  
  if (response.ok) {
    alert('Book added!')
  } else {
    alert('book no add :(', error)
  }
};
document.getElementById('add-book-btn').addEventListener('click', addBook);