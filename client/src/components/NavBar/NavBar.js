import React from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import style from './styles';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Logo from '../../images/boomtown.svg';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: true,
      anchorEl: null
    };
  }

  handleChange = event => {
    this.setState({ auth: event.target.checked });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes } = this.props;
    const { auth, anchorEl } = this.state;
    const open = Boolean(anchorEl);
    const { location } = this.props;
    console.log(this.props);
    return (
      location.pathname !== '/home' && (
        <div className={classes.root}>
          <AppBar position="static">
            <Toolbar>
              <a href="/client/src/pages/Items/index.js">
                <img
                  src={Logo}
                  alt="Boomtown Logo"
                  style={{
                    height: '50px',
                    width: '100px',
                    padding: '0px',
                    margin: '0px'
                  }}
                />
              </a>

              <Typography
                variant="h6"
                color="inherit"
                className={this.props.classes.grow}
                style={{ marginLeft: '87%' }}
              />
              {auth && (
                <div>
                  <IconButton
                    aria-owns={open ? 'menu-appbar' : null}
                    aria-haspopup="true"
                    onClick={this.handleMenu}
                    color="inherit"
                  >
                    <AccountCircle />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                    open={open}
                    onClose={this.handleClose}
                  >
                    <MenuItem onClick={this.handleClose}>
                      <Link to="/Profile/1">Profile</Link>
                    </MenuItem>
                    <MenuItem onClick={this.handleClose}>Sign Out</MenuItem>
                  </Menu>
                </div>
              )}
            </Toolbar>
          </AppBar>
        </div>
      )
    );
  }
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(style)(withRouter(NavBar));

// class NavBar extends Component {
//   constructor(props) {
//     super(props);
//   }

//   render() {
//     return (
//       this.props.location.pathname !== '/home' && (
//         <div>

//         </div>
//       )
//     );
//   }
// }

// export default withStyles(style)(withRouter(NavBar));
