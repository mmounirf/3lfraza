import React from "react";
import { Switch, Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Dashboard from "../Pages/Dashboard";

const PrivateRoute = ({ component: Component, authed, ...rest }) => (
    <Route
      {...rest}
      render={props => (
        authed
          ? <Component {...props} />
          : <Redirect to="/login" />
      )}
    />
  );

const Routes = () => {
  const user = useSelector(state => state.user);
  const isLoggedIn = user && user.jwt;

  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <PrivateRoute authed={isLoggedIn} exact path="/dashboard" component={Dashboard} />

      <Redirect to="/" />
    </Switch>
  );
};

export default Routes;
