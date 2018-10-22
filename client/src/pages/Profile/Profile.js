import { withStyles } from '@material-ui/core/styles';
import React from 'react';

import styles from './styles';

const Profile = ({ classes, data }) => {
  return (
    <div>
      <p>PROFILE PAGE!!</p>
      <p>{data}</p>
    </div>
  );
};

export default withStyles(styles)(Profile);
