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
        console.log(books)
        console.log('Retrieved books');
      } else {
        console.error('couldnt fetch books')
      }
    } catch (err){
      console.error('failed to fetch', err)
    }
  }
})