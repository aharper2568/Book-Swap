
const exchangeButtons = document.querySelectorAll('.exchange-btn');


exchangeButtons.forEach(button => {
  button.addEventListener('click', async (event) => {
    const bookId = event.target.getAttribute('data-book-id');
    const ownerId = event.target.getAttribute('data-owner-id');
    const userId = document.getElementById('userId').value; 

    try {
      const response = await fetch('/api/books/exchange', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bookId,
          currentOwnerId: ownerId,
          newOwnerId: userId
        }),
      });

      if (response.ok) {
        alert('Exchanged :)');
        location.reload();
      } else {
        alert('no exchange :(');
      }
    } catch (err) {
      console.error('Error:', err);
    }
  });
});