const userId = document.getElementById('userId').value;

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
    <button id="add-book-btn" onclick="addBook('${book.googleBooksId}','${book.title}','${book.author}','${book.coverImageUrl}')"> Add Book to Collection </button>
    `;

    searchResults.appendChild(bookElement);
  })
}

async function addBook(googleBooksId, title, author, coverImageUrl) {
 
  console.log(userId)
  const response = await fetch(`/api/books/user/${userId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
      googleBooksId: String(googleBooksId),
      title,
      author, 
      coverImageUrl, 
      userId: parseInt(userId),
    }),
  });
  
  if (response.ok) {
    // Show success modal
    const successModal = new bootstrap.Modal(document.getElementById('successModal'));
    successModal.show();


  } else {
    // Show error modal
    const errorModal = new bootstrap.Modal(document.getElementById('errorModal'));
    errorModal.show();
  }
};