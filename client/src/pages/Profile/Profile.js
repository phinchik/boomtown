import { withStyles } from '@material-ui/core/styles';
import React from 'react';
import ProfileCard from '../../components/ProfileCard/';

import styles from './styles';

const Profile = ({ classes, data }) => {
  return (
    <div className={classes.itemContainer}>
      <ProfileCard data={data} />
    </div>
  );
};

export default withStyles(styles)(Profile);
