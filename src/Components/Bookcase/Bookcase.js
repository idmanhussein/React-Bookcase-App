import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Col, Row } from "react-bootstrap";
import "./Bookcase.css";

const Bookcase = ({ bookcase, setBookcase }) => {
  const removeBook = (book) =>
    setBookcase(bookcase.filter((item) => item !== book));

  return (
    <>
      {bookcase.map((item) => {
        const price = () =>
          item.saleInfo.saleability === "FOR_SALE"
            ? "£" + item.saleInfo.listPrice.amount
            : "£0.00";

        return (
          <>
            <Row>
              <Col className="ml-5 p-5">
                <h2 className="mt-5">{item.volumeInfo.title}</h2>
                <h6>by</h6>
                <h4>
                  {item.volumeInfo.authors &&
                  item.volumeInfo.authors.length === 1
                    ? item.volumeInfo.authors[0]
                    : item.volumeInfo.authors.concat(",")}
                </h4>
                <p className="description">{item.volumeInfo.description}</p>
              </Col>
              <Col className="ml-5 mt-5">
                <img
                  class="d-flex align-items-start flex-column mt-5 ml-5"
                  src={item.volumeInfo.imageLinks.thumbnail}
                  alt="bookImages"
                />
                <h6 className="mt-5 ml-5">{price()}</h6>

                <Button
                  variant="danger"
                  className="mt-5 ml-5"
                  onClick={() => removeBook(item)}
                >
                  Remove
                </Button>
              </Col>
            </Row>
          </>
        );
      })}
    </>
  );
};

export default Bookcase;
