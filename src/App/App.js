import React, { useState, Fragment } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "../Components/Header/Header";
import Search from "../Components/Search/Search";
import data from "../Models/books.json";
import BookList from "../Components/Booklist/BookList";
import About from "../Pages/About/About";
import Bookcase from "../Components/Bookcase/Bookcase";
import Pagination from "../Components/Pagination/Pagination";
import { Layout } from "../Components/Layout/Layout";
import NavBar from "../Components/Navbar/NavBar";
import { Typography } from "@material-ui/core";

const App = () => {
  const [books, setBooks] = useState(data);
  localStorage.getItem("books");
  const [keyword, setKeyword] = useState("");
  const [bookcase, setBookcase] = useState([]);
  const [currentPage, setCurrentPage] = useState([1]);
  const [booksPerPage] = useState(6);

  async function findBooks(value) {
    const results = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${value}&filter=paid-ebooks&print-type=books&projection=lite`
    ).then((res) => res.json());
    if (!results.error) {
      setBooks(results.items);
    }
  }

  function addBookToBookcase(title) {
    let findBooks = books.find((book) => title === book.volumeInfo.title);
    setBookcase((existingBook) => existingBook.concat(findBooks));
  }

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <BrowserRouter>
      <Layout>
        <Typography>
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <Fragment>
                  <NavBar />
                  <Header bookcase={bookcase.length} />
                  <Search
                    findBooks={findBooks}
                    keyword={keyword}
                    setKeyword={setKeyword}
                  />
                  <BookList
                    books={currentBooks}
                    addBookToBookcase={addBookToBookcase}
                    stored="library"
                  />
                  <Pagination
                    booksPerPage={booksPerPage}
                    totalBooks={books.length}
                    paginate={paginate}
                  />
                </Fragment>
              )}
            />

            <Route
              exact
              path="/about"
              render={() => (
                <Fragment>
                  <NavBar bookcase={bookcase.length} />
                  <About />
                </Fragment>
              )}
            />

            <Route
              exact
              path="/bookcase"
              render={() => (
                <Fragment>
                  <NavBar bookcase={bookcase.length} />
                  <h1 className="bookcase-title">My Bookcase</h1>
                  <Bookcase bookcase={bookcase} setBookcase={setBookcase} />
                </Fragment>
              )}
            />

            <Route
              exact
              path="/search"
              render={() => (
                <Fragment>
                  <NavBar bookcase={bookcase.length} />
                  <Header />
                  <Search
                    findBooks={findBooks}
                    keyword={keyword}
                    setKeyword={setKeyword}
                  />
                </Fragment>
              )}
            />
          </Switch>
        </Typography>
      </Layout>
    </BrowserRouter>
  );
};
export default App;
