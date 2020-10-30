import React, { useState, Fragment } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./Components/Header/Header";
import Search from "./Components/Search/Search";
import data from "./Models/books.json";
import BookList from "./Components/Booklist/BookList";
import About from "./Pages/About";
import Bookcase from "./Components/Bookcase/Bookcase";
import Pagination from "./Components/Pagination/Pagination";
import { Layout } from "./Components/Layout/Layout";
import NavBar from "./Components/Navbar/NavBar";

const App = (props) => {
  const [books, setBooks] = useState(data);
  const [keyword, setKeyword] = useState("");
  const [bookcase, setBookcase] = useState([]);

  const [currentPage, setCurrentPage] = useState([1]);
  const [booksPerPage] = useState(5);

  /* useEffect(() => {
    const findBooks = async (value) => {
      setLoading(true);
      const results = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${value}&filter=paid-ebooks&print-type=books&projection=lite`
      ).then((res) => res.json());
      setBooks(results.items);
      setLoading(false);
    };

    findBooks();
  }, []);
*/

  async function findBooks(value) {
    const results = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${value}&filter=paid-ebooks&print-type=books&projection=lite`
    ).then((res) => res.json());
    if (!results.error) {
      setBooks(results.items);
    }
  }

  function addBookToBookcase(title) {
    let findBooks = books.filter((book) => title === book.volumeInfo.title);
    setBookcase((existingBook) => existingBook.concat(findBooks));
  }

  function removeBook(title) {
    const newBooks = books.filter((book) => {
      return title !== book.volumeInfo.title;
    });
    setBooks(newBooks);
  }

  // Get current books
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <BrowserRouter>
      <Layout>
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
                <NavBar />
                <About />
              </Fragment>
            )}
          />

          <Route
            exact
            path="/bookcase"
            render={() => (
              <Fragment>
                <NavBar />
                <Header />
                <Bookcase bookcase={bookcase} removeBook={removeBook} />
              </Fragment>
            )}
          />

          <Route
            exact
            path="/search"
            render={() => (
              <Fragment>
                <NavBar />
                <Header />
                <Search
                  findBooks={findBooks}
                  keyword={keyword}
                  setKeyword={setKeyword}
                />
                <Bookcase bookcase={bookcase} removeBook={removeBook} />
              </Fragment>
            )}
          />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
