import { withStyles } from '@material-ui/core/styles';
import React from 'react';
import ShareItemForm from '../../components/ShareItemForm';
import Grid from '@material-ui/core/Grid';
import CardForm from '../../components/CardForm';

import styles from './styles';

const Share = ({ classes }) => {
  return (
    <div className={classes.sharePage}>
      <Grid
        container
        className={classes.root}
        direction="row"
        alignItems="center"
        justify="center"
      >
        <Grid item xs={12} sm={12} md={6}>
          <CardForm style={{ width: '50px' }} />
        </Grid>
        <Grid item xs={12} sm={12} md={6} className={classes.sharePageItem1}>
          <ShareItemForm />
        </Grid>
      </Grid>
    </div>
  );
};

export default withStyles(styles)(Share);
