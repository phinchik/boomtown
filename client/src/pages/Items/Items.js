import { withStyles } from '@material-ui/core/styles';
import React from 'react';
import CardForm from '../../components/CardForm/CardForm';

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

export default withStyles(styles)(Items);
