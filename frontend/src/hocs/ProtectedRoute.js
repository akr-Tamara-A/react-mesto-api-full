import React from 'react';
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = (props) => {
  return props.loggedIn ? <Route path={props.path}>{props.children}</Route> : <Redirect to="/signin" />
}

export default ProtectedRoute;