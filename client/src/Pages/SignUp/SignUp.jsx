import React from "react";
import { connect } from "react-redux";
import "./SignUp.less";

export const SignUp = (props) => {
  return (
    <div>
      <h1>Sign Up</h1>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
