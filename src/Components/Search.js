import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

const Search = (props) => {
  const [keyword, setKeyword] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    props.findBooks(props.keyword);
  };

  return (
    <div>
      <Form onSubmit={(e) => handleSubmit(e)}>
        <h1>{keyword && "Searching for keyword: " + keyword}</h1>
        <input
          type="text"
          value={props.keyword}
          onChange={(e) => props.setKeyword(e.target.value)}
        />
        <input type="submit" value="Find" />
      </Form>
    </div>
  );
};

export default Search;
