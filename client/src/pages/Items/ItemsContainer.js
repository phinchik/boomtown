import React, { Component } from 'react';
import { Query } from 'react-apollo';
import Items from './Items';
import { ALL_ITEMS_QUERY } from '../../apollo/queries';
import { ViewerContext } from '../../context/ViewerProvider';

class ItemsContainer extends Component {
  render() {
    return (
      <ViewerContext.Consumer>
        {({ viewer, loading, item }) => {
          return (
            <Query query={ALL_ITEMS_QUERY} variables={{ filter: viewer.id }}>
              {({ loading, error, data }) => {
                if (loading) return 'loading';
                if (error) return `${error}`;
                if (data) {
                  return <Items key={viewer.id} viewer={viewer} data={data} />;
                }
              }}
            </Query>
          );
        }}
      </ViewerContext.Consumer>
    );
  }
}

export default ItemsContainer;
