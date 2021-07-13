import React from "react";
import { connect } from "react-redux";

export const PageNotFound = (props) => {
  return (
    <div>
      <h1>404 page</h1>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PageNotFound);
