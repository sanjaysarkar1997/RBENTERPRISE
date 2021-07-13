import React from "react";
import { connect } from "react-redux";
import { loading } from "./Redux/action/loading";
import Loader from "./LOADER/Loader";
import "./App.less";
import Routes from "./Routes";

function App(props) {
  return (
    <>
      <Loader />
      <Routes />
    </>
  );
}

const mapToStateProps = (state) => ({
  LOADING: state.Loading.Loading,
});

export default connect(mapToStateProps, { loading })(App);
