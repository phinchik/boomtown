import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import styles from './styles';
import BoomtownLogo from '../../images/boomtown.svg';
import moment from 'moment';

const ProfileCard = ({ classes, data }) => {
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
              <div className={classes.userContainer} />
              <Typography className={classes.fullname}>
                {data.user.fullname}
              </Typography>
            </div>
          </Typography>
          {/* <Typography>
              {moment(new Date(data.user.date)).fromNow()}
            </Typography> */}
          <Typography className={classes.shareItems}>
            <div style={{ marginRight: '5px' }}>
              SHARED ITEMS {data.user.items.length}
            </div>
            <div className={classes.borrowed}>
              BORROWED ITEMS {data.user.borrowed.length}
            </div>
          </Typography>

          <Typography>BIO {data.user.bio}</Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default withStyles(styles)(ProfileCard);
