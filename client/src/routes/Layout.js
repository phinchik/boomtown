import React, { Fragment } from 'react';
import { Redirect, Route, Switch, Router } from 'react-router';
import Items from '../pages/Items';
import NavBar from '../components/NavBar';
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import Share from '../pages/Share';

export default () => (
  <Fragment>
    <NavBar />
    <Switch>
      <Route exact path="/items" component={Items} />
      <Route exact path="/profile/:userid" component={Profile} />
      <Route exact path="/share" component={Share} />
      <Route exact path="/home" component={Home} />
      <Redirect to="/home" />

      <Route path="*" component={Items} />
    </Switch>
  </Fragment>
);
