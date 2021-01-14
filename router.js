const express = require("express");
const router = express.Router();
const bookList = require("./bookListController");

/* Get all bookList */
router.get("/", bookList.index);
/* Create/Add new item to bookList */
router.post("/add", bookList.create);
/* Get book based on Id */
router.get("/id/:id", bookList.searchId);
/* Get book based on Title */
router.get("/title/:title", bookList.searchTitle);
/* Get book based on Author */
router.get("/author/:author", bookList.searchAuthor);
/* Get book based on readStatus */
router.get("/read/:readStatus", bookList.read);
/* Delete book based on Id */
router.delete("/id/:id", bookList.delete);
/* Update book Title, Author or readStatus */
router.put("/id/:id", bookList.update);

module.exports = router;
