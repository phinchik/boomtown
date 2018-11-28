import { withStyles } from '@material-ui/core/styles';
import React from 'react';
import ShareItemForm from '../../components/ShareItemForm';
import ShareItemPreview from '../../components/ShareItemPreview';
import PropTypes from 'prop-types';

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

Share.propTypes = {
  classes: PropTypes.object.isRequired,
  tags: PropTypes.object.isRequired
};

export default withStyles(styles)(Share);
