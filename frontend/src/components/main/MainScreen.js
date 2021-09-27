import React, { Component } from "react";
import Body from "./Body";

import Header from "./Header";

class MainScreen extends Component {
  constructor(props) {
    super(props);
    this.props= props;
    this.state = { username: this.props.username,  
                    isAdmin: this.props.isAdmin };
  }

  render() {
    return (
      <div>
      <Header 
        username={this.state.username}
        onClickLogoutButton={this.props.onClickLogoutButton}
      />
      <Body 
        username={this.state.username}
        isAdmin={this.state.isAdmin}
      />
      </div>
    );
  }
}

export default MainScreen;