import React from "react";
import Book from "../Book/Book";

const BookList = ({ books, addBookToBookcase }) => {
  return (
    <div>
      {books.map((book) => (
        <Book key={book.id} book={book} addBookToBookcase={addBookToBookcase} />
      ))}
    </div>
  );
};

export default BookList;
