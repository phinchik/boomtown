import { Query } from 'react-apollo';
import React, { Component } from 'react';

import { VIEWER_QUERY } from '../apollo/queries';

export const ViewerContext = React.createContext();

export default class ViewerProvider extends Component {
  render() {
    return (
      <Query query={VIEWER_QUERY}>
        {({ data, loading }) => {
          const viewer = data && data.viewer ? data.viewer : null;
          return (
            <ViewerContext.Provider value={{ viewer, loading }}>
              {this.props.children}
            </ViewerContext.Provider>
          );
        }}
      </Query>
    );
  }
}
