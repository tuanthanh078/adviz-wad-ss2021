import React, { Component } from "react";

class Header extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }
  render() {
    return (
      <div id="header-bar">
        <div id="header-info">
          Hello {this.props.username}
        </div>
        <button 
          type="button" 
          id="logout-button" 
          name="logout-button"
          onClick={this.props.onClickLogoutButton}
        >
          Logout
        </button>
      </div>
    );
  } 
}

export default Header;