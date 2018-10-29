import { withStyles } from '@material-ui/core/styles';
import React from 'react';
import ShareItemForm from '../../components/ShareItemForm';
import Grid from '@material-ui/core/Grid';
import ShareItemPreview from '../../components/ShareItemPreview';

import styles from './styles';

const Share = ({ classes, tags }) => {
  return (
    <div className={classes.root}>
      <div>
        <ShareItemPreview className={classes.shareItemPreview} />
      </div>

      <div className={classes.sharePageItem1}>
        <ShareItemForm tags={tags} />
      </div>
    </div>
  );
};

export default withStyles(styles)(Share);
