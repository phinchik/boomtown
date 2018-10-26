import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { ADD_USER_MUTATION } from '../../apollo/queries';

class ItemsContainer extends Component {
  render() {
    return (
      <Query query={ADD_USER_MUTATION} variables={{ filter: 1 }}>
        {({ loading, error, data }) => {
          console.log('error', error);
          console.log('data', data);
          if (loading) return 'loading';
          if (error) return `${error.message}`;
          if (data) {
            console.log('addd user data>>>>>>', data);
            return <Items data={data} />;
          }
        }}
      </Query>
    );
  }
}

export default ItemsContainer;
