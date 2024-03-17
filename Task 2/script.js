"use strict"

const library = new Library();
const book = new Book('title', 'author', 2020)
library.addBook(book);
library.removeBook(id);

let user = new User("Name");

book.addRating(user, 5) // this user haven't read this book 
// here we do not add user object, only his id
user.borrowBook('title', library);
user.returnBook('title', library);
book.addRating(user, 5);