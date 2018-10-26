import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import styles from './styles';
import BoomtownLogo from '../../images/boomtown.svg';
import CardForm from '../CardForm';

const ProfileCard = ({ classes, data }) => {
  console.log('profilecarddata>>>>>>>', data);
  return (
    <div className={classes.root}>
      <div className={classes.div}>
        <Card className={classes.card}>
          <CardContent>
            <Typography gutterBottom variant="display3" component="h2">
              <div className={classes.media}>
                <Avatar
                  src={BoomtownLogo}
                  alt="Boomtown Logo"
                  className={classes.avatar}
                />
                <div className={classes.userContainer} />
                <Typography>PHINCHIK</Typography>
              </div>
            </Typography>

            <Typography className={classes.userInput}>
              Name your item
            </Typography>
            <Typography className={classes.DescribeInput}>
              itemsss from the card form
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default withStyles(styles)(ProfileCard);
