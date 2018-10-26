import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Profile from './Profile';
import { ALL_USER_ITEMS_QUERY } from '../../apollo/queries';

class ProfileContainer extends Component {
  render() {
    return (
      <Query query={ALL_USER_ITEMS_QUERY} variables={{ filter: 1 }}>
        {({ loading, error, data }) => {
          if (loading) return 'loading';
          if (error) return `${error}`;
          if (data) {
            return <Profile data={data} />;
          }
        }}
      </Query>
    );
  }
}

export default ProfileContainer;
