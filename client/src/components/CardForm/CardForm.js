import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import styles from './styles';
import Button from '@material-ui/core/Button';

const CardForm = ({ classes, item }) => {
  console.log('carddata>>>>>>>', item);
  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardMedia component="img" src={item.imageurl} />
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant="display3" component="h2">
            <div className={classes.row}>
              <Avatar
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCZpwfJpyfqP1GtKOEuBVsLJ_yE-bP7lt91ClEjGppog3ylzoZpQ"
                alt="Boomtown Logo"
                className={classes.avatar}
              />
              <div className={classes.userContainer}>
                <p className={classes.user}>PHINCHIK</p>

                {/* <span className={classes.timeCard}>{item.date}</span> */}
              </div>
            </div>
          </Typography>

          <Typography className={classes.userInput}>{item.title}</Typography>
          <Typography className={classes.userTags}>
            {item.tags.map(tag => <p>{tag.title}</p>)}
          </Typography>
          <Typography className={classes.DescribeInput}>
            {item.description}
          </Typography>
          <Button
            className={classes.button}
            id="sharesubmit"
            type="submit"
            variant="contained"
          >
            BORROW
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

CardForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CardForm);
