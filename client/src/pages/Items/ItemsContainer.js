import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Items from './Items';
import ITEM_QUERY from './src/apollo/queries';

// const GET_ITEMS = gql`
//   {
//     items(filter: 1) {
//       id
//       timedate
//       borrower {
//         id
//       }
//     }
//   }
// `;

class ItemsContainer extends Component {
  render() {
    return (
      <Query query={ITEM_QUERY}>
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

export default ItemsContainer;
