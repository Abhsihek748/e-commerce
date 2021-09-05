import React, { useState, useContext } from 'react';
import { AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography, Button } from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { CommerceContext } from '../../Context/CommerceProvider';
import { AuthContext } from '../../Context/AuthProvider';
import logo from '../../assets/commerce.png';
import useStyles from './styles';

const PrimarySearchAppBar = () => {
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const { cart } = useContext(CommerceContext);
  const { currentUser, logout } = useContext(AuthContext);
  const totalItems = cart.total_items;
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => setMobileMoreAnchorEl(null);
  const handleLogout = async () => {
    await logout();
    history.push('/');
  };

  const mobileMenuId = 'primary-search-account-menu-mobile';

  const renderMobileMenu = (
    <Menu anchorEl={mobileMoreAnchorEl} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} id={mobileMenuId} keepMounted transformOrigin={{ vertical: 'top', horizontal: 'right' }} open={isMobileMenuOpen} onClose={handleMobileMenuClose}>
      <MenuItem>
        <IconButton component={Link} to="/cart" aria-label="Show cart items" color="inherit">
          <Badge badgeContent={totalItems} color="secondary">
            <ShoppingCart />
          </Badge>
        </IconButton>
        <p>Cart</p>
      </MenuItem>
    </Menu>
  );

  return (
    <>
      <AppBar position="fixed" className={classes.appBar} color="inherit">
        <Toolbar>
          <Typography component={Link} to="/" variant="h6" className={classes.title} color="inherit">
            <img src={logo} alt="commerce.js" height="25px" className={classes.image} /> Commerce.js
          </Typography>
          <div className={classes.grow} />
          {location.pathname === '/' && (
          <div className={classes.button}>
            <IconButton component={Link} to="/cart" aria-label="Show cart items" color="inherit">
              <Badge badgeContent={totalItems} color="secondary">
                <ShoppingCart />
              </Badge>
            </IconButton>
          </div>
          )}
          { (location.pathname !== '/Login' && location.pathname !== '/Signup') && (
            <div className={classes.button}>
              {currentUser === null
                ? (
                  <Button component={Link} to="/Login" aria-label="Login" color="inherit">
                    Login
                  </Button>
                )
                : (
                  <Button component={Link} to="/" aria-label="Login" color="inherit" onClick={handleLogout}>
                    Logout
                  </Button>
                )}
            </div>
          )}
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </>
  );
};

export default PrimarySearchAppBar;
