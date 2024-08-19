
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
        // Show success modal
        const successModal = new bootstrap.Modal(document.getElementById('successModal'));
        successModal.show();

        // Optionally reload after the modal is closed
        document.getElementById('successModal').addEventListener('hidden.bs.modal', () => {
          location.reload();
        });
      } else {
        // Show error modal
        const errorModal = new bootstrap.Modal(document.getElementById('errorModal'));
        errorModal.show();
      }
    } catch (err) {
      console.error('Error:', err);
      // Show error modal
      const errorModal = new bootstrap.Modal(document.getElementById('errorModal'));
      errorModal.show();
    }
  });
});