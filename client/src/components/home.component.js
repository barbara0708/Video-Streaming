import React, { Component } from "react";

import UserService from "../services/user.service";

export default class HomeComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  componentDidMount() {
    UserService.getPublicContent().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  render() {
    return (
      <div className="container">
        <header className="jumbotron">
          <h1>Upload your video here!</h1>
        </header>
        <div className="flex">
          <video className="h-50" muted controls playsInline loop src="./display-video">

          </video>
        </div>
      </div>
    );
  }
}