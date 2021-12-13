import React, { lazy } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import PublicRoute from "./Routes/PublicRoute";
import PrivateRoute from "./Routes/PrivateRoute";
import LazyLoader from "./LazyWrapper/LazyLoader";
import Authguard from "./Routes/Authgurad";
import Home from "./Pages/Home";
import Login from "./Pages/Login/Login";
import Print from "./Pages/Print";
import PrintNonGST from "./Pages/PrintNonGST";
import ViewEntry from "./Pages/ViewEntry";

const SignUp = lazy(() => import("./Pages/SignUp/SignUp"));
const Restricted = lazy(() => import("./Pages/Login/Login"));
const PageNotFound = lazy(() => import("./Pages/PageNotFound/PageNotFound"));

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login">
          {localStorage.getItem("logged") ? (
            <Redirect to="/view-items" />
          ) : (
            <Login />
          )}
        </Route>
        <PublicRoute
          restricted={false}
          component={LazyLoader(SignUp)}
          path="/sign-up"
        />
        <PublicRoute component={Print} path="/print/:id" />
        <PublicRoute component={PrintNonGST} path="/print-non-gst/:id" />
        <PublicRoute component={ViewEntry} path="/view-entry/:id" />
        <PrivateRoute component={LazyLoader(Restricted)} path="/private" />
        <Authguard>
          <Home />
        </Authguard>
        <PublicRoute
          restricted={false}
          component={LazyLoader(PageNotFound)}
          path="*"
        />
      </Switch>
    </BrowserRouter>
  );
}
