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
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/icons/AddCircle';

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
    return (
      location.pathname !== '/home' && (
        <div className={classes.root}>
          <AppBar position="static">
            <Toolbar
              style={{
                margin: '5px',
                display: 'flex',
                justifyContent: 'space-between'
              }}
            >
              <a href="/client/src/pages/Items/index.js">
                <img
                  src={Logo}
                  alt="Boomtown Logo"
                  style={{
                    height: '50px',
                    width: '50px',
                    padding: '0px',
                    marginRight: '0px'
                  }}
                />
              </a>
              <Typography
                variant="h6"
                color="inherit"
                className={this.props.classes.grow}
              />

              {auth && (
                <div>
                  <Button className={classes.shareButton}>
                    <Link to="/share" className={classes.icon}>
                      <Icon style={{ paddingTop: '5px' }} /> SHARE SOMETHING
                    </Link>
                  </Button>

                  <IconButton
                    aria-owns={open ? 'menu-appbar' : null}
                    aria-haspopup="true"
                    onClick={this.handleMenu}
                    color="inherit"
                  >
                    <AccountCircle style={{ padding: '0', marginLeft: '0' }} />
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
                      <Link to="/profile/1">Profile</Link>
                    </MenuItem>
                    <MenuItem onClick={this.handleClose}>
                      <Link to="/home">Log Out</Link>
                    </MenuItem>
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
