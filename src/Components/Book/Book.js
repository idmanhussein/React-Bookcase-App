import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import BookIcon from "@material-ui/icons/Book";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Grid, CardActionArea } from "@material-ui/core";
import { Paper } from "@material-ui/core";
import { Box } from "@material-ui/core";
import "./Book.css";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    flexWrap: "wrap",
  },

  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
  },
  media: {
    height: 199,
    paddingTop: "56.25%",
    width: 128,
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const Book = ({ book, addBookToBookcase }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

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
  console.log(book);
  return (
    <Grid item lg={4} md={3} xs={12} sm={3} spacing={1}>
      <Paper align="center" fontStyle="italics" className={Paper.classes}>
        <CardActionArea>
          <Typography component="div">
            <Box fontStyle="italic" fontWeight="fontWeightBold">
              {title}
            </Box>
            by {authors}
          </Typography>

          <Card className={classes.root}>
            <CardHeader className={classes.title}>{title}</CardHeader>
            <CardMedia
              className={classes.media}
              image={thumbnail}
              alt="book-image"
            />

            <CardActions disableSpacing>
              <IconButton
                variant="outlined"
                color="primary"
                onClick={() => addBookToBookcase(title)}
              >
                <BookIcon />
              </IconButton>

              <IconButton
                className={clsx(classes.expand, {
                  [classes.expandOpen]: expanded,
                })}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </IconButton>
            </CardActions>

            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography paragraph>{description}</Typography>
              </CardContent>
            </Collapse>
          </Card>
        </CardActionArea>
      </Paper>
    </Grid>
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
