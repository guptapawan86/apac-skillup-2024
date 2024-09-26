
import React, { Component } from "react";
import loadingIcon from "../images/icon-loading.svg";

class Loading extends Component {
  render() {
    return (
      <div className="loading">
        <img src={loadingIcon} alt="Loading..." />
      </div>
    );
  }
}

export default Loading;
