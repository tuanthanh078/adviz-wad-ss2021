import React, { Component } from "react";

import LoginForm from "./LoginForm";

class Login extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    return (
      <LoginForm onLogin={this.props.onLogin} />
    );
  }
}
export default Login;