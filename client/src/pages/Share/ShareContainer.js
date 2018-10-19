import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Share from './Profile';

class ShareContainer extends Component {
  render() {
    return (
      <Query query={Share}>
        {({ loading, error, data }) => {
          if (loading) return 'loading';
          if (error) return `${error}`;
          if (data) {
            console.log(data);
            return <Items data={data} />;
          }
        }}
      </Query>
    );
  }
}

export default ShareContainer;
