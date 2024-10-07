// Global array to store books
const myLibrary = [];

// Book constructor
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

// Add book to library array
function addBookToLibrary(book) {
  myLibrary.push(book);
  displayBooks();
}

// Function to create new book card and display in the DOM
function displayBooks() {
  const bookDisplay = document.getElementById('bookDisplay');
  bookDisplay.innerHTML = ''; // Clear previous display

  myLibrary.forEach((book, index) => {
    const bookCard = document.createElement('div');
    bookCard.classList.add('bookCard');

    bookCard.innerHTML = `
      <h3>${book.title}</h3>
      <p>Author: ${book.author}</p>
      <p>Pages: ${book.pages}</p>
      <p>Read: ${book.read ? "Yes" : "No"}</p>
      <button class="removeBtn" data-index="${index}">Remove</button>
      <button class="toggleReadBtn" data-index="${index}">${book.read ? "Unread" : "Read"}</button>
    `;

    // Append book card to display
    bookDisplay.appendChild(bookCard);
  });

  // Add event listeners for the remove and toggle read buttons
  document.querySelectorAll('.removeBtn').forEach(button => {
    button.addEventListener('click', removeBook);
  });

  document.querySelectorAll('.toggleReadBtn').forEach(button => {
    button.addEventListener('click', toggleReadStatus);
  });
}

// Remove book from library array
function removeBook(e) {
  const bookIndex = e.target.getAttribute('data-index');
  myLibrary.splice(bookIndex, 1); // Remove book from array
  displayBooks(); // Update display
}

// Toggle read status of a book
function toggleReadStatus(e) {
  const bookIndex = e.target.getAttribute('data-index');
  myLibrary[bookIndex].read = !myLibrary[bookIndex].read; // Toggle read status
  displayBooks(); // Update display
}

// Event listener to open the modal for new book form
document.getElementById('newBookBtn').addEventListener('click', () => {
  document.getElementById('bookFormModal').showModal();
});

// Event listener to cancel the form
document.getElementById('cancelForm').addEventListener('click', () => {
  document.getElementById('bookFormModal').close();
});

// Handle form submission for adding a new book
document.getElementById('bookForm').addEventListener('submit', (e) => {
  e.preventDefault(); // Prevent form from submitting traditionally

  // Collect form data
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = document.getElementById('pages').value;
  const read = document.getElementById('read').checked;

  // Create a new book and add it to the library
  const newBook = new Book(title, author, pages, read);
  addBookToLibrary(newBook);

  // Clear form and close modal
  document.getElementById('bookForm').reset();
  document.getElementById('bookFormModal').close();
});

// Add some sample books to the library for testing
addBookToLibrary(new Book("The Hobbit", "J.R.R. Tolkien", 310, true));
addBookToLibrary(new Book("1984", "George Orwell", 328, false));
addBookToLibrary(new Book("To Kill a Mockingbird", "Harper Lee", 281, true));
