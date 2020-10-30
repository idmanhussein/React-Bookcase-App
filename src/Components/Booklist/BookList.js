import React from "react";
import Book from "../Book/Book";

const BookList = (props) => {
  return (
    <div>
      {props.books.map((book) => (
        <Book
          key={book.id}
          book={book}
          addBookToBookcase={props.addBookToBookcase}
        />
      ))}
    </div>
  );
};

export default BookList;
