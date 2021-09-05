import React from 'react';
import { CssBaseline } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CommerceProvider from './Context/CommerceProvider';
import AuthProvider from './Context/AuthProvider';
import { Navbar, Products, Cart, Checkout, SignUp, Login } from './components';
import PrivateRoute from './components/Auth/PrivateRoute';

const App = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  return (
    <Router>
      <AuthProvider>
        <CommerceProvider>
          <div style={{ display: 'flex' }}>
            <CssBaseline />
            <Navbar handleDrawerToggle={handleDrawerToggle} />
            <Switch>
              <Route exact path="/">
                <Products handleUpdateCartQty />
              </Route>
              <Route exact path="/cart">
                <Cart />
              </Route>
              <PrivateRoute
                path="/checkout"
                exact
                component={Checkout}
              />
              <Route path="/SignUp"><SignUp />
              </Route>
              <Route path="/Login"><Login />
              </Route>
            </Switch>
          </div>
        </CommerceProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
