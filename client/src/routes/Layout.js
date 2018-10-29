import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import Items from '../pages/Items';
import Profile from '../../src/pages/Profile';
import Share from '../../src/pages/Share';
import NavBar from '../../src/components/NavBar';
import Home from '../../src/pages/Home';

import { ViewerContext } from '../context/ViewerProvider';

export default () => (
  <React.Fragment>
    <NavBar />
    <ViewerContext.Consumer>
      {({ viewer, loading }) => {
        if (viewer) {
          return (
            <Switch>
              <Route exact path="/items" component={Items} />
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/profile/:userid" component={Profile} />
              <Route exact path="/share" component={Share} />
              <Redirect to="/items" />
            </Switch>
          );
        } else {
          return (
            <Switch>
              <Route exact path="/home" component={Home} />
              <Redirect from="*" to="/home" />
            </Switch>
          );
        }
      }}
    </ViewerContext.Consumer>
  </React.Fragment>
);
