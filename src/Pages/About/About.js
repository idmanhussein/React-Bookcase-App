import React from "react";

import "./About.css";
const About = () => {
  return (
    <div className="about-page">
      <h1 className="about-header">Hi, welcome to my online library!</h1>
      <p className="about-paragraph">
        <p>
          I'm Idman and this web app was born out of my love for reading. As
          someone who's passionate about life-long learning, reading is such an
          important part of my life. I'm so happy to be able to share this with
          you!
        </p>
        <p>
          On the home page, you'll find a few of my favourite reads. If that
          doesn't suit your taste, you can simply search for a book that you
          would enjoy! Bookmark your favourite books to add them to your
          bookcase. If you change your mind - no problem! Simply remove the book
          and continue exploring.
        </p>
      </p>
    </div>
  );
};

export default About;
