"use strict";

const Library = function() {
    const books = [];

    const createBookId = () => {
        return '#' + Math.floor(Math.random()*10000);
    };

    this.addBook = (book) => {
        const newBookId = createBookId();
        book.bookId = newBookId;
        books.push(book);
    };

    this.removeBook = (id) => {
        const index = books.findIndex(book => book.id === id);
        if (index !== -1) {
            books.splice(index, 1);
        }
    };

    this.findBooksByAuthor = (author) => {
        return books.filter(book => book.author === author);
    };

    this.listAvailableBooks = () => {
        return books.filter(book => book.available === true);
    };
};

const Book = function(title, author, year) {
    this.title = title;
    this.author = author;
    this.year = year;
    this.available = true;
    this.ratings = [];

    this.addRating = (user, rating) => {
        const userId = user.id;
        if (this.ratings.find(rating => rating.userId === userId)) {
            console.log("User has already rated this book.");
            return;
        }
        this.ratings.push({ userId, rating });
    };

    this.getAverageRating = () => {
        if (this.ratings.length === 0) return 0;
        const totalRating = this.ratings.reduce((acc, curr) => acc + curr.rating, 0);
        return totalRating / this.ratings.length;
    };

    this.toggleAvailability = () => {
        this.available = !this.available;
    };
};

const User = function(name) {
    this.name = name;
    this.borrowedBooks = [];

    this.borrowBook = (title, library) => {
        const bookToBorrow = library.listAvailableBooks().find(book => book.title === title);
        if (bookToBorrow) {
            bookToBorrow.toggleAvailability();
            this.borrowedBooks.push(bookToBorrow.id);
            console.log(`${this.name} borrowed ${title}`);
        } else {
            console.log(`${title} is not available for borrowing.`);
        }
    };

    this.returnBook = (title, library) => {
        const bookToReturn = library.findBooksByTitle(title).find(book => this.borrowedBooks.includes(book.id));
        if (bookToReturn) {
            bookToReturn.toggleAvailability();
            this.borrowedBooks = this.borrowedBooks.filter(id => id !== bookToReturn.id);
            console.log(`${this.name} returned ${title}`);
        } else {
            console.log(`You have not borrowed ${title}`);
        }
    };
};

const library = new Library();
const book1 = new Book('Book1', 'Author1', 2020);
const book2 = new Book('Book2', 'Author2', 2019);

library.addBook(book1);
library.addBook(book2);

let user1 = new User("Alice");
let user2 = new User("Bob");

book1.addRating(user1, 5); // Alice hasn't read Book1 yet

user1.borrowBook('Book1', library);
user2.borrowBook('Book2', library);

console.log(library.listAvailableBooks());
console.log(book1.getAverageRating());
