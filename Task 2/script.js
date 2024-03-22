"use strict";
// Пишу это уже в самом конце, на следующий день после того как вроде получилось сделать библиотеку. Я пересмотрел наши видео и видео с ютуба потому что я просто сел,
// перечитал задание раза 3-4 и было такое ощущение будто мне обьяснили что существуют молоток и гвозди, но никто не говорил что с их помощью можно что-то
// строить или чинить, и в голове просто нету идей с чего начать. Короче посмотрев другие задачи похожего плана в инете и их решения, я воодушевился 
// написать то что есть. Однако прошу заметить что код я менял наверное раза 3 потому что оно не работало так как я хотел, и что-бы выыпутаться из трудных 
// ситуаций где я просто не мог чего-то понять - я прибегал к помощи ИИ. Вот прямо первый раз за все дз которые ты давал. Либо я глуповат либо просто устал,
// но у меня тут tailwind, впереди еще просмотреть лекцию за 15 марта и выполнить там дз, групповой проект, и короче я сижу не могу понять как что надо сделать 
// поэтому пришлось разбераться с этим как есть. Но в итоге я в принципе понял, даже если есть ошибки, я разобрался для чего нам конструктор функций. Классно 
// было бы еще понимать как их использовать вместе с фронтом, потому что у меня вот нималейшей идеи. Выглядит так будто создаешь какую-то программу с нуля
// которой никто не будет пользоваться потому что в мире все это и так уже давно создали и выложили в открытый доступ с фиксами и т.д. Но для практики, супер.
// Ладно, как начну писать... сорри. Основные момент где хотелось бы разобраться я помечал цифрами в комментариях что--бы потом было легче ссылаться. Приступаем:

function createBookId() {
    // return '#' + Math.floor(Math.random()*10000);  (2) Если создавать ID вместе с # то потом не получается удалить книгу функцией removeBook.
    // С чем связано понять не могу.
    return Math.floor(Math.random() * 10000);
}

// функция конструктор для создания книги
function Book(title, author, year) {
    this.id = createBookId();
    this.title = title;
    this.author = author;
    this.year = year;
    this.available = true;
    this.borrowed = false;
    this.ratings = [];

    function createBookId() {
        // return '#' + Math.floor(Math.random()*10000);  (2) Если создавать ID вместе с # то потом не получается удалить книгу функцией removeBook.
        // С чем связано понять не могу.
        return Math.floor(Math.random() * 10000);
    }

    // добавляем рейтинг, но не даем добавить если пользователь книгу не брал.
    this.addRating = function (user, rating) {
        if (this.borrowed && user.borrowedBooks.includes(this.id)) {
            this.ratings.push(rating);
        } else {
            console.log("This user hasn't borrowed this book.");
        }
    }
    // полностью подсмотрел на форуме по подсчету среднего рейтинга. Короче как ты понял я тут многое не писал из головы, чтото из старых дз либо из инета)))
    // в целом то логично, просто мне трудно было догадаться что .length отвечает за суммарное количество оценок)) Ниче, качаемся как говорится
    this.getAverageRating = function () {
        if (this.ratings.length === 0) return 0;
        const sum = this.ratings.reduce((acc, curr) => acc + curr, 0);
        return sum / this.ratings.length;
    }
}

// Конструктор по созданию библиотеки. 
function Library() {
    this.books = [];

    this.addBook = function (book) {
        this.books.push(book);
    }
    // вначале сделал как в кофейне, типа через findIndex. А потом гдето в видео увидел что оказывается можно переписать просто массив, добавив все, кроме заданного.
    // все гениальное просто)))
    this.removeBook = function (bookId) {
        this.books = this.books.filter(book => book.id !== bookId);
        return console.log(`You've removed book with id ${bookId}`)
    }

    this.findBooksByAuthor = function (author) {
        return this.books.filter(book => book.author === author);
    }

    this.listAvailableBooks = function () {
        return this.books.filter(book => book.available === true);
    }
}


// Ну и пользователи. 
function User(name) {
    this.id = generateUserId();
    this.name = name;
    this.borrowedBooks = [];

    function generateUserId() {
        return 'user' + Math.floor(Math.random() * 10000);
    }

    // Выдаём книгу. Тоже подсмотрел что оказывается ненадо писать if available === true то выдаем , а если нет то не выдаем. А можно использовать функцию
    // которая является методом нашего Library, если он будет возвращать нам массив, но я гдето 60 минут не мог понять где ошибка, а оказывается надо было
    // просто записать () чтобы вызвать функцию listAvailableBooks))) Тебе наверное кажется что я совсем тугой, но просто тяжко когда сидишь долго)))
    this.borrowBook = function (title, library) {
        const bookToBorrow = library.listAvailableBooks().find((book) => (book.title === title));

        // Я короче понял что надо сделать так что-бы если bookToBorrow доступен для выдачи то статусы меняются, а если нет - то нет. Но потом я понял
        // что у меня же есть id ведь книги могут иметь одинаковое название но являться разными книгами. Ну и ИИ подсказал мне что тут делать потому что
        // мой мозг не понимал а в интернете найти не вышло решение. Короче типа создается отдельный массив с айди книгами которые взяты пользователями)
        // Не знаю может быть ты это как то по другому видел))
        if (bookToBorrow) {
            bookToBorrow.available = false;
            bookToBorrow.borrowed = true;
            this.borrowedBooks.push(bookToBorrow.id);
            console.log(`${this.name} borrowed ${title} with id ${bookToBorrow.id}`);
        } else {
            console.log(`${title} is not available for borrowing.`);
        }
    }

    // Ну самое трудное было сделать возврат по id но так как есть соответствующий массив - то вроде как все понятно, хоть и запутано слегка вначале.
    // но вот эти фишки с айди - удалениями и добавлениями для меня все равно кажутся громоздкими. Может я сам себя переиграл?
    this.returnBook = function (title, library) {
        const bookToReturn = library.books.find( (book) => (this.borrowedBooks.includes(book.id) ));
        if (bookToReturn && bookToReturn.title === title) {
            bookToReturn.available = true;
            bookToReturn.borrowed = false;
            this.borrowedBooks = this.borrowedBooks.filter((id) => (id !== bookToReturn.id));
            console.log(`${this.name} returned ${title} with id ${bookToReturn.id}`);
        } else {
            console.log(`You have not borrowed ${title}`);

        }
    }
}

const library = new Library();
const user1 = new User("Yurii");
const user2 = new User("Maria");
const user3 = new User("Denys");

const book1 = new Book('The Book Of Mysteries', 'Jonathan Cahn', 2016);
const book2 = new Book('Harry Potter', 'J.K.Rowling', 2000);
const book3 = new Book('Harry Potter', 'J.K.Rowling', 2000);

library.addBook(book1);
library.addBook(book2);
library.addBook(book3);


user1.borrowBook('The Book Of Mysteries', library);
user2.borrowBook('Harry Potter', library);
user3.borrowBook('Harry Potter', library);

user3.returnBook('Harry Potter', library);

console.log(library.listAvailableBooks());

book1.addRating(user1, 5);

