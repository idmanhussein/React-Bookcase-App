import React from "react";
import { Button, Form } from "react-bootstrap";

const Search = ({ keyword, findBooks, setKeyword }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    findBooks(keyword);
  };

  return (
    <div>
      <Form onSubmit={(e) => handleSubmit(e)}>
        <Form.Group controlId="searchKeyword">
          <Form.Label>Find your latest read!</Form.Label>
          <Form.Control
            className="mr-sm-1 text-center"
            type="text"
            placeholder="Enter keyword"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Find
        </Button>
      </Form>
    </div>
  );
};

export default Search;
