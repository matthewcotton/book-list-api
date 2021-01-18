const createError = require("http-errors");

let bookList = [];
let id = 0;

function findId(id) {
  return bookList.find((book) => book.id == id);
}

function findTitle(title) {
  return bookList.filter((book) => book.title.toLowerCase() == title.toLowerCase());
}

function findAuthor(author) {
  return bookList.filter((book) => book.author.toLowerCase() == author.toLowerCase());
}

function findRead(readStatus) {
  return bookList.filter((book) => book.readStatus == readStatus);
}

/* Return all books in BookList */
exports.index = function (req, res) {
  res.send({ bookList });
};

/* Add new book to bookList */
exports.create = function (req, res, next) {
  if (!req.body.title) {
    return next(createError(400, "Title is required"));
  } else if (!req.body.author) {
    return next(createError(400, "Author is required"));
  }
  bookList.push({
    id,
    title: req.body.title,
    author: req.body.author,
    readStatus: req.body.readStatus ? req.body.readStatus : false,
  });
  res.send({ result: true, newId: id });
  id++;
};

/* Return one book based on Id value */
exports.searchId = function (req, res, next) {
  const book = findId(req.params.id);
  if (!book) {
    return next(createError(404, `No book found with id ${req.params.id}`));
  }
  res.send(book);
};

/* Return books based on Title */
exports.searchTitle = function (req, res, next) {
  const books = findTitle(req.params.title);
  if (!books.length) {
    return next(createError(404, `No book found with title ${req.params.title}`));
  }
  res.send(books);
};

/* Return books based on Author */
exports.searchAuthor = function (req, res, next) {
  const books = findAuthor(req.params.author);
  if (!books.length) {
    return next(createError(404, `No book found by author ${req.params.author}`));
  }
  res.send(books);
};

/* Return book based on readStatus */
exports.read = function (req, res, next) {
  let books = [];
  if (req.params.readStatus == "true") {
    books = findRead(true);
  } else if (req.params.readStatus == "false") {
    books = findRead(false); 
  } else {
    return next(createError(400, `Invalid readStatus of ${req.params.readStatus} was provided`));
  }
  if (!books.length) {
    return next(createError(404, `No book have the readStatus ${req.params.readStatus}`));
  }
  res.send(books);
};

/* Delete book from bookList */
exports.delete = function (req, res, next) {
  if (!findId(req.params.id)) {
    return next(createError(404, `No book found with id ${req.params.id}`));
  }
  bookList = bookList.filter((book) => book.id != req.params.id);
  res.send({ result: true });
};

/* Update Title and/or Author and/or readStatus */
exports.update = function (req, res, next) {
  if (!findId(req.params.id)) {
    return next(createError(404, `No book found with id ${req.params.id}`));
  }
  bookList = bookList.map((book) => {
    if (book.id == req.params.id) {
      req.body.title ? (book.title = req.body.title) : book.title;
      req.body.author ? (book.author = req.body.author) : book.author;
      req.body.readStatus
        ? (book.readStatus = req.body.readStatus)
        : book.readStatus;
    }
    return book;
  });
  res.send({ result: true });
};
