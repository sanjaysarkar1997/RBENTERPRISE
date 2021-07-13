import React from "react";
import { Route, Redirect } from "react-router-dom";
import Login from "../Utilities/Login";

const Authguard = ({ children, ...rest }) => {
  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /signin page
    <Route
      {...rest}
      render={(props) => (Login() ? children : <Redirect to="/sign-up" />)}
    />
  );
};

export default Authguard;
