import { withStyles } from '@material-ui/core/styles';
import React from 'react';

import styles from './styles';

const Items = ({ classes }) => {
  return (
    <div>
      {/* <p>
        {data.items.map(item => {
          return (
            <div>
              id: {item.id} title: {item.title}
            </div>
          );
        })}
      </p> */}
      <h1> THIS IS ITEMS!!!! </h1>
    </div>
  );
};

export default withStyles(styles)(Items);
