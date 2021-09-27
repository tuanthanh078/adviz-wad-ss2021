import React, { Component } from "react";

class InfoForm extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    // if (this.props.contact !== undefined) 
    //   this.props.contact.isPrivate = this.props.contact.isPrivate === "true";
    this.state = {
      contact: this.props.contact === undefined 
        ? {firstname: "", 
          lastname: "", 
          street: "", 
          streetnr: "", 
          zip: "", 
          city: "", 
          state: "", 
          country: "",
          owner: this.props.owners.length === 1 ? this.props.owners[0] : "admina", 
          isPrivate: true} 
        : this.props.contact
    };
    this.updateCheckbox = this.updateCheckbox.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  updateCheckbox() {
    //event.preventDefault();
    let newState = {
      ...this.state,
        contact: {
          ...this.state.contact,
          isPrivate: !this.state.contact.isPrivate
      }};
    this.setState(newState, () => this.props.onChange(newState.contact));
  }

  handleChange(event) {
    let newState = {
      ...this.state,
        contact: {
          ...this.state.contact,
          [event.target.name]: event.target.value
      }};
    this.setState(newState, () => this.props.onChange(newState.contact));
  }

  render() {
    return (
      <div>
        <div className="form-row">
          <label htmlFor="firstname" className="form-label">First name: </label>
          <input type="text" id="first-nameID" name="firstname" onChange={this.handleChange} required value={this.state.contact.firstname} />
        </div>

        <div className="form-row">
          <label htmlFor="lastname" className="form-label">Last name: </label>
          <input type="text" id="last-nameID" name="lastname" onChange={this.handleChange}  required value={this.state.contact.lastname} />
        </div>

        <div className="form-row">
          <label htmlFor="street" className="form-label">Street/Nr: </label>
          <input type="text" id="streetID" name="street" onChange={this.handleChange}  required value={this.state.contact.street} />
          <input type="number" id="streetnrID" name="streetnr" onChange={this.handleChange}  value={this.state.contact.streetnr} />
        </div>

        <div className="form-row">
          <label htmlFor="zip" className="form-label">ZIP: </label>
          <input type="number" id="zipID" name="zip" onChange={this.handleChange} required value={this.state.contact.zip} />
        </div>

        <div className="form-row">
          <label htmlFor="city" className="form-label">City: </label>
          <input type="text" id="cityID" name="city" onChange={this.handleChange} required  value={this.state.contact.city} />
        </div>

        <div className="form-row">
          <label htmlFor="state" className="form-label">State: </label>
          <input type="text" id="stateID" name="state" onChange={this.handleChange} value={this.state.contact.state} />
        </div>

        <div className="form-row">
          <label htmlFor="country" className="form-label">Country: </label>
          <input type="text" id="countryID" name="country" onChange={this.handleChange} value={this.state.contact.country} />
        </div>

        <div className="form-row" id="owner-select">
          <label htmlFor="owner" className="form-label">Owner: </label>
          <select id="ownerID" name="owner" onChange={this.handleChange}>
            {this.props.contact === undefined || this.props.isAdmin 
              ? this.props.owners.map(owner => <option key={owner} value={owner}>{owner}</option>)
              : <option key={this.state.contact.owner} value={this.state.contact.owner}>{this.state.contact.owner}</option>}
          </select>
        </div>

        <div className="form-row" id="private-row">
          <label htmlFor="private" className="form-label" >Private </label>
          <input type="checkbox" id="privateID" name="private" onChange={this.updateCheckbox} checked={this.state.contact.isPrivate} />
        </div>
      </div>
    );
  }
}

export default InfoForm;