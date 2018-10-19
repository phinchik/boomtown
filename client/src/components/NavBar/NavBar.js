import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class NavBar extends Component {
  render() {
    return (
      <div>
        <NavLink to="/profile" exact activeClassName="selected">
          Profile
        </NavLink>
      </div>
    );
  }
}

export default NavBar;
