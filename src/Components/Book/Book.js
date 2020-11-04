import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { Button } from "@material-ui/core";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import BookIcon from "@material-ui/icons/Book";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Grid } from "@material-ui/core";
import { Paper } from "@material-ui/core";

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
    paddingTop: "56.25%", // 16:9
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

  return (
    <Grid container spacing={10} className={classes.root}>
      <Grid item xs={3} spacing={3}>
        <Paper className={Paper.classes}>
          {title}
          <Card className={classes.root}>
            <CardHeader
              avatar={
                <Avatar aria-label="book-list" className={classes.avatar}>
                  {title}
                </Avatar>
              }
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
            />
            <CardMedia
              className={classes.media}
              image={thumbnail}
              alt="book-image"
            />
            <CardContent>
              <Typography
                variant="body2"
                color="textSecondary"
                component="span"
              >
                {renderAmount}
              </Typography>
            </CardContent>
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
        </Paper>
      </Grid>
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
