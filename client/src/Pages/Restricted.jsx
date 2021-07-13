import React from "react";
import { connect } from "react-redux";

export const Restricted = (props) => {
  return (
    <div>
      <h2>Restricted</h2>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Restricted);
