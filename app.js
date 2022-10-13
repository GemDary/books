let library = [];

// Book Div and Template const
const temp = document.querySelector('.book');
const bookshelf = document.querySelector('#bookshelf');
let idBook = library.length;

function Book(title, author, isbn) {
    this.id = idBook;
    this.title = title;
    this.author = author;
    this.isbn = isbn;

    idBook += 1;
}

function ReloadLibrary() {
    library = JSON.parse(localStorage.library);

    bookshelf.innerHTML = '';
    bookshelf.appendChild(temp);

    for (let i = 0; i < library.length; i += 1) {
        // eslint-disable-next-line no-use-before-define
        DisplayBook(library[i]);
    }
}

function SaveBook(title, author, isbn) {
    const book = new Book(title, author, isbn);
    if (!Array.isArray(library)) {
        library = [];
    }
    library.push(book);

    localStorage.library = JSON.stringify(library);

    ReloadLibrary();
}

// eslint-disable-next-line no-unused-vars
function AddBook() {
    // eslint-disable-next-line no-restricted-globals
    event.preventDefault();

    const formAddBook = document.forms.AddBook;
    const bookData = new FormData(formAddBook);

    const bookTitle = bookData.get('title');
    const bookAuthor = bookData.get('author');
    const bookIsbn = bookData.get('isbn');

    formAddBook.reset();

    SaveBook(bookTitle, bookAuthor, bookIsbn);
}
/* eslint-enable no-unused-vars */

function DeleteBook(id) {
    library = library.filter((book) => book.id !== id);

    localStorage.library = JSON.stringify(library);

    ReloadLibrary();
}

function DisplayBook(book) {
    const clon = temp.content.cloneNode(true);
    clon.querySelectorAll('p')[0].innerHTML = 'BOOK NAME: '+book.title;
    clon.querySelectorAll('p')[1].innerHTML = 'AUTHOR NAME: '+book.author;
    clon.querySelectorAll('p')[2].innerHTML = 'BOOK ISBN: '+book.isbn;

    clon.querySelector('button').addEventListener('click', () => { DeleteBook(book.id); });

    bookshelf.appendChild(clon);
}

// Load the Library on opening the page
ReloadLibrary();
