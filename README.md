# Book List API Instructions

## Get All Books
https://book-list-api-mcotton.herokuapp.com/

Returns an array of all books in the book list.

## Add Book to List
https://book-list-api-mcotton.herokuapp.com/add

JSON Body Spec:

*	Title is a String and is required.
*	Author is a String and is required.
*	readStatus is a Boolean and is optional. If not provided will be assumed to be unread (false).
*	ID is a number and will be added automatically. It is returned as part of the response to a successful add request. 


## Search by ID
https://book-list-api-mcotton.herokuapp.com/id/{ID}

One book will be returned if the provided ID exists. 

## Search by Title
https://book-list-api-mcotton.herokuapp.com/title/{Title}

Use “%20” for spaces. Case is ignored. 
All books with this title will be returned.
Only exact matches are returned. 

## Search by Author
https://book-list-api-mcotton.herokuapp.com/author/{Author}

Use “%20” for spaces. Case is ignored. 
All books by this author will be returned.
Only exact matches are returned.

## Search by readStatus
https://book-list-api-mcotton.herokuapp.com/read/{readStatus}

Provided readStatus must be a Boolean (true or false).
A list of books with the provided readStatus will be returned.
If not results are found with the provided readStatus then a 404 error will be returned. 

## Delete Book
https://book-list-api-mcotton.herokuapp.com/id/{ID}

One book will be deleted if the provided ID exists. 

## Update Book Title, Author or readStatus
https://book-list-api-mcotton.herokuapp.com/id/{ID}

Title and/or Author and/or readStatus will be updated of the book with the provided ID, if it exists. 
Only the items provided within the body will be updated. 
