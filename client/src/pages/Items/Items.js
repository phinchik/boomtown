import { withStyles } from '@material-ui/core/styles';
import React from 'react';
import CardForm from '../../components/CardForm/CardForm';
import PropTypes from 'prop-types';

import styles from './styles';

const Items = ({ classes, data }) => {
  return (
    <div className={classes.itemContainer}>
      {data.items.map(item => {
        return (
          <div key={item.id} className={classes.itemCards}>
            <CardForm item={item} />
          </div>
        );
      })}
    </div>
  );
};

Items.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired
};

export default withStyles(styles)(Items);
