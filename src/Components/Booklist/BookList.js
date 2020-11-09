import React from "react";
import Book from "../Book/Book";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    flexWrap: "wrap",
  },
}));
const BookList = ({ books, addBookToBookcase }) => {
  const classes = useStyles();

  return (
    <div>
      <Grid
        container
        spacing={10}
        className={clsx(classes.root)}
        direction="row"
      >
        {books.map((book) => (
          <Book
            key={book.id}
            book={book}
            addBookToBookcase={addBookToBookcase}
          />
        ))}
      </Grid>
    </div>
  );
};

export default BookList;
