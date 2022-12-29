import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import React, { useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { getSession } from './auth/authenticationSlice';
import Login from './components/backend/auth/Login';
import MainLayout from './layout/MainLayout';
import { RootState } from './store/store';
import PrivateRoute from './auth/private-route';

import ClientMainLayout from './layout/ClientMainLayout';

import SignIn from './components/front-end/auth/SignIn';

import { CartProvider } from './context/CartContext';
import { CourseProvider } from './context/CourseBoughtContext';

interface AppProps extends PropsFromRedux {}

const App = (props: AppProps) => {
  const { sessionHasBeenFetched, isAuthenticated, getSession } = props;

  useEffect(() => {
    getSession();
  }, []);

  return (
    <CartProvider>
      <CourseProvider>
        <Router>
          <React.Fragment>
            <Switch>
              <Route exact path="/login" component={Login}></Route>
              <Route exact path="/sign-in" component={SignIn} />
              {/* <PrivateRoute exact path="/" component={MainLayout}></PrivateRoute> */}
              <Route path="/admin" component={MainLayout}></Route>
            </Switch>
            <ClientMainLayout />
          </React.Fragment>
        </Router>
      </CourseProvider>
    </CartProvider>
  );
};

// có thể dùng hooks thay connector => https://react-redux.js.org/tutorials/typescript-quick-start#use-typed-hooks-in-components

const mapState = ({ authentication }: RootState) => ({
  isAuthenticated: authentication.isAuthenticated,
  account: authentication.account,
  sessionHasBeenFetched: authentication.sessionHasBeenFetched,
});

const mapDispatch = {
  getSession,
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(App);
