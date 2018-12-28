import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import styles from './styles';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import Gravatar from 'react-gravatar';
import { ViewerContext } from '../../context/ViewerProvider';
import moment from 'moment';

const CardForm = ({ classes, item }) => {
  return (
    <ViewerContext.Consumer>
      {({ viewer }) => {
        return (
          <div className={classes.root}>
            <Card className={classes.card}>
              <CardMedia
                className={classes.cardMedia}
                component="img"
                src={
                  item.imageurl
                    ? item.imageurl
                    : 'http://wiki.tripwireinteractive.com/images/4/47/Placeholder.png'
                }
                title="Item's Picture"
              />

              <Link to={`/profile/${item.owner.id}`}>
                <CardHeader
                  avatar={
                    <Gravatar
                      className={classes.avatar}
                      email={item.owner.email || viewer.email}
                    />
                  }
                  title={item.owner.fullname || viewer.fullname}
                  subheader={moment(new Date(item.timedate)).fromNow()}
                />
              </Link>

              <CardContent className={classes.cardContent}>
                <Typography className={classes.userInput}>
                  {item.title}
                </Typography>
                <Typography className={classes.userTags}>
                  {item.tags.map(tag => tag.title).join(', ')}
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
      }}
    </ViewerContext.Consumer>
  );
};

CardForm.propTypes = {
  classes: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired
};

export default withStyles(styles)(CardForm);
