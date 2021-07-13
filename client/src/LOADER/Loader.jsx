import React, { Fragment } from "react";
import { connect } from "react-redux";
import "./Loader.css";

export const Loader = (props) => {
  return (
    <Fragment>
      {props.LOADING.length !== 0 && (
        <div className="square-container">
          <div className="rounded-square">
            <div className="dot-wrapper">
              <svg className="dot" height="20" width="30">
                <circle cy="10" cx="15" r="10" fill="#E67A93" />
              </svg>
              <svg className="dot" height="20" width="30">
                <circle cy="10" cx="15" r="10" fill="#6EC6E6" />
              </svg>
              <svg className="dot" height="20" width="30">
                <circle cy="10" cx="15" r="10" fill="#E69B4C" />
              </svg>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  LOADING: state.Loading?.LOADING,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Loader);
