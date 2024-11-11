import React from "react";

import "./Loading.css";
const Loading = () => {
  return (
    <div className="loading-container">
      <div className="loading-screen">
        <div className="lds-ellipsis">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
