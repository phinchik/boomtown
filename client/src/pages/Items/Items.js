import { withStyles } from '@material-ui/core/styles';
import React from 'react';

import styles from './styles';

const Items = ({ classes, data }) => {
  console.log('data >>>>', data);
  return (
    <div>
      <p>
        {/* This is the items page located at <code>/items</code>. */}
        {data.items.map(item => {
          return (
            <div>
              id: {item.id} title: {item.title}
            </div>
          );
        })}
      </p>
      <h1> THIS IS ITEMS!!!! </h1>
    </div>
  );
};

export default withStyles(styles)(Items);
