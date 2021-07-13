import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./SignUp.less";

export const SignUp = (props) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Link to="/login">Go to login</Link>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
