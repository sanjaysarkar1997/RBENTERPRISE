import React from "react";
import "./LoaderCircular.css";

export default function LoaderCircular() {
  return (
    <div className="wrapper">
      <div className="loader">
        <div className="face face1">
          <div className="circle"></div>
        </div>
        <div className="face face2">
          <div className="circle"></div>
        </div>
      </div>
    </div>
  );
}
