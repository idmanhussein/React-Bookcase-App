import React, { useState, useEffect } from "react";
import { MDBCol } from "mdbreact";
import { Button, Typography } from "@material-ui/core";
import { Divider } from "@material-ui/core";
import SearchBar from "material-ui-search-bar";

const Search = ({ keyword, findBooks, setKeyword }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    findBooks(keyword);
  };

  return (
    <MDBCol md="12">
      <form onSubmit={(e) => handleSubmit(e)}>
        <Typography variant="h6" className="form-label" align="center">
          Find your latest read!
        </Typography>
        <Divider variant="middle" />
        <SearchBar
          type="text"
          placeholder="Search"
          value={keyword}
          onChange={(value) => setKeyword(value)}
        />

        <Button
          color="secondary"
          variant="outlined"
          type="submit"
          value="Submit"
        >
          Find
        </Button>
      </form>
    </MDBCol>
  );
};

/* return (
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
*/
export default Search;
