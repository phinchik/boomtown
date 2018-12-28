import React, { Component } from 'react';
import { Query } from 'react-apollo';
import Profile from './Profile';
import { ALL_USER_ITEMS_QUERY } from '../../apollo/queries';
import { ViewerContext } from '../../context/ViewerProvider';

class ProfileContainer extends Component {
  render() {
    return (
      <ViewerContext.Consumer>
        {({ viewer, loading }) => {
          return (
            <Query
              query={ALL_USER_ITEMS_QUERY}
              variables={{ filter: viewer.id }}
            >
              {({ loading, error, data }) => {
                if (loading) return loading;
                if (error) return `${error}`;
                if (data) {
                  return <Profile viewerId={viewer.id} data={data} />;
                }
              }}
            </Query>
          );
        }}
      </ViewerContext.Consumer>
    );
  }
}

export default ProfileContainer;
