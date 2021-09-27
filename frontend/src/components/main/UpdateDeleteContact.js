import React, { Component } from "react";

import InfoForm from "./InfoForm";

class UpdateDeleteContact extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    return (
      <div id="add-screen" className="form">
    	  <form id="add-form" onSubmit={this.props.onApplyClick}>
          <InfoForm contact={this.props.contact} owners={this.props.owners} onChange={this.props.onChange}/>
          <button type="submit" className="apply-button" id="apply-button">Apply</button>
        	<button type="button" className="delete-button" id="delete-button" onClick={this.props.onDeleteClick}>Delete</button>
          <button type="button" name="back-button" id="back-button" onClick={this.props.onBackClick}>Back</button>
        </form>
      </div>
    );
  }
}
export default UpdateDeleteContact;