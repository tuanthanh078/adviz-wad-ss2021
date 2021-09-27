import React, { Component } from "react";

class ButtonBar extends Component {
  constructor(props) {
    super(props);
    this.props= props;
    this.state = { username: this.props.username,  
                    isAdmin: this.props.isAdmin };
  }

  render() {
    return (
      <div className="button-bar">
        <button 
          type="button" 
          className="contact-button" 
          name="show-my-contacts-button" 
          id="show-my-button"
          onClick={this.props.onShowMyContactsClick}
        >
          Show my contacts
        </button>
        <button 
          type="button" 
          className="contact-button" 
          name="show-all-contacts-button" 
          id="show-all-button"
          onClick={this.props.onShowAllContactsClick}
        >
          Show all contacts
        </button>
        <button 
          type="button" 
          id="add-new-button" 
          className="contact-button" 
          name="add-new-contact-button"
          onClick={this.props.onAddNewContactsClick}
        >
          Add new contact
        </button>
      </div>
    );
  }
}

export default ButtonBar;