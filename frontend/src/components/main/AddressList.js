import React, { Component } from "react";


class AddressList extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = { highlight: "" };
  }
  
  componentDidUpdate(prevProps) {
    if(this.props.highlight !== prevProps.highlight) // Check if it's a new user, you can also use some unique property, like the ID  (this.props.user.id !== prevProps.user.id)
    {
      this.setState({ highlight: this.props.highlight})
    }
  } 

  render() {
    return (
      <div className="address-bar">
        <ul id="address-list" className="address-list">
          {this.props.contacts.map((contact) =>
            <li key={contact._id.toString()} className="address" style={this.state.highlight === contact._id ? {"backgroundColor": "#ff0000"} : {"backgroundColor": "#b3b3b3"}} onClick={() => this.props.onAddressClick(contact._id)}>
              {contact.firstname +  " " + contact.lastname}
            </li>
          )}
        </ul>
      </div>
    );
  }
}
export default AddressList;