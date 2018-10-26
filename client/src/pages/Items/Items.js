import { withStyles } from '@material-ui/core/styles';
import React from 'react';
import CardForm from '../../components/CardForm/CardForm';

import styles from './styles';

const Items = ({ classes, data }) => {
  return (
    <div className={classes.itemContainer}>
      {data.items.map(item => {
        console.log('this is the item>>>>>', item);
        return (
          <div className={classes.itemCards}>
            <CardForm key={item.id} item={item} />
          </div>
        );
      })}
    </div>
  );
};

export default withStyles(styles)(Items);
