import React, { Component } from 'react';
import { Query } from 'react-apollo';
import Share from './Share';
import { ALL_TAGS_QUERY } from '../../apollo/queries';

class ShareContainer extends Component {
  render() {
    return (
      <Query query={ALL_TAGS_QUERY}>
        {({ loading, error, data }) => {
          if (loading) return 'loading';
          if (error) return `${error}`;
          if (data) {
            return <Share tags={data} />;
          }
        }}
      </Query>
    );
  }
}

export default ShareContainer;
