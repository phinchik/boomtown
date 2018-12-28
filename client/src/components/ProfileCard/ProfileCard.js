import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import styles from './styles';
import BoomtownLogo from '../../images/boomtown.svg';
import PropTypes from 'prop-types';
// import moment from 'moment';

const ProfileCard = ({ classes, data, items }) => {
  return (
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
              <Typography className={classes.fullname}>
                {data.user.fullname}
              </Typography>
            </div>
          </Typography>
          {/* <Typography>{moment(new Date(data.user.date)).fromNow()}</Typography> */}
          <div className={classes.shareItems}>
            <Typography className={classes.sharedText}>
              SHARED ITEMS {items.length}
            </Typography>
            <Typography className={classes.borrowedText}>
              BORROWED ITEMS {data.user.borrowed.length}
            </Typography>
          </div>

          <Typography className={classes.bio}>BIO {data.user.bio}</Typography>
        </CardContent>
      </Card>
    </div>
  );
};

ProfileCard.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  items: PropTypes.array.isRequired
};

export default withStyles(styles)(ProfileCard);
