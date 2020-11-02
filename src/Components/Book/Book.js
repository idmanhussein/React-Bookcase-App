import React from "react";
import PropTypes from "prop-types";
import Card from "@material-ui/core";
import CardActions from "@material-ui/core";
import CardContent from "@material-ui/core";

const Book = ({ book, addBookToBookcase }) => {
  const {
    volumeInfo: {
      title,
      authors,
      description,
      imageLinks: { thumbnail },
    },
  } = book;
  const renderAmount = () => {
    if (
      book.saleInfo &&
      book.saleInfo.listPrice &&
      book.saleInfo.listPrice.amount
    ) {
      return "£" + book.saleInfo.listPrice.amount;
    }
    return "No price available";
  };

  return (
    <div className="book-list">
      <img src={thumbnail} alt="bookImage" />
      <h2 className="bookTitle">{title}</h2>
      <h3 className="bookAuthor">
        {authors.length === 1 ? authors[0] : authors.join(", ")}
      </h3>
      <p className="bookPrice">{renderAmount()}</p>
      <p className="bookDescription">{description}</p>
      <div>
        <button
          className="addBookButton"
          onClick={() => addBookToBookcase(title)}
        >
          Add
        </button>
      </div>
    </div>
  );
};

Book.propTypes = {
  book: PropTypes.shape({
    volumeInfo: PropTypes.shape({
      title: PropTypes.string.isRequired,
      authors: PropTypes.array.isRequired,
      description: PropTypes.string.isRequired,
      imageLinks: PropTypes.shape({
        thumbnail: PropTypes.string.isRequired,
      }),
    }),
    saleInfo: PropTypes.shape({
      listPrice: PropTypes.shape({
        amount: PropTypes.number.isRequired,
      }),
    }),
  }),
};

export default Book;
