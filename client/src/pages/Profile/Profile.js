import { withStyles } from '@material-ui/core/styles';
import React from 'react';
import ProfileCard from '../../components/ProfileCard/';
// import { ViewerContext } from '../../context/ViewerProvider';

import styles from './styles';
import CardForm from '../../components/CardForm';
import PropTypes from 'prop-types';

const Profile = ({ classes, data, viewerId }) => {
  const viewerBorrowedItems = data.user.borrowed.filter(item => {
    return viewerId === item.borrower.id;
  });
  const viewerItems = data.user.items.filter(item => {
    return viewerId === item.owner.id;
  });

  return (
    <div className={classes.profileCard}>
      <ProfileCard data={data} items={viewerItems} />
      <div className={classes.cardForm}>
        {viewerItems &&
          viewerItems.map(item => {
            return (
              <div className={classes.card}>
                <CardForm item={item} />
              </div>
            );
          })}

        {viewerBorrowedItems &&
          viewerBorrowedItems.map(item => {
            return (
              <div className={classes.card}>
                <CardForm item={item} />
              </div>
            );
          })}
      </div>
    </div>
  );
};

Profile.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  viewerId: PropTypes.string.isRequired
};

export default withStyles(styles)(Profile);
