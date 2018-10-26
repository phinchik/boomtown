import { withStyles } from '@material-ui/core/styles';
import React from 'react';
import ShareItemForm from '../../components/ShareItemForm';
import Grid from '@material-ui/core/Grid';
import ShareItemPreview from '../../components/ShareItemPreview';

import styles from './styles';

const Share = ({ classes, tags }) => {
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
          <ShareItemPreview />
        </Grid>

        <Grid item xs={12} sm={12} md={6} className={classes.sharePageItem1}>
          <ShareItemForm tags={tags} />
        </Grid>
      </Grid>
    </div>
  );
};

export default withStyles(styles)(Share);
