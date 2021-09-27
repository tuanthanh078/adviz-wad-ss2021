import React, { Component } from "react";

import InfoForm from "./InfoForm";

class AddNewContacts extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    return (
      <div id="add-screen" className="form">
    	  <form id="add-form" onSubmit={this.props.onAddClick}>
          <InfoForm owners={this.props.owners} onChange={this.props.onChange}/>
        	<button type="submit" name="add-button" id="add-button">Add</button>
        	<button type="button" name="back-button" id="back-button" onClick={this.props.onBackClick}>Back</button>
        </form>
      </div>
    );
  }
}
        	//<button type="submit" name="apply-button" id="apply-button">Apply</button>
        	//<button type="button" name="delete-button" id="delete-button">Delete</button>
export default AddNewContacts;