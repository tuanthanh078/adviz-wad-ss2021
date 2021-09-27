import React, { Component } from "react";
import axios from "axios";

import AddressList from "./AddressList";
import ButtonBar from "./ButtonBar";
import Map from "./Map";
import AddNewContacts  from "./AddNewContacts";
import UpdateDeleteContact from "./UpdateDeleteContact";

// const Wrapper = styled.section`
//   width: 100vw;
//   height: 100vh;
// `;

class Body extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.emptyContact = {
      firstname: "", 
      lastname: "", 
      street: "", 
      streetnr: "", 
      zip: "", 
      city: "", 
      state: "", 
      country: "",
      owner: "", 
      isPrivate: true};
    this.state = { username: this.props.username,  
                    isAdmin: this.props.isAdmin, 
                    screen: 0,
                    contacts: [],
                    contactsInAddressList: [],
                    currentUserID: "",
                    currentContact: this.emptyContact,
                    places: [],
                    highlight: -1
                  };
    this.loading = true;
    this.onAddNewContactsClick = this.onAddNewContactsClick.bind(this);
    this.onShowMyContactsClick = this.onShowMyContactsClick.bind(this);
    this.onShowAllContactsClick = this.onShowAllContactsClick.bind(this);
    this.onBackClick = this.onBackClick.bind(this);
    this.onAddressClick = this.onAddressClick.bind(this);
    this.onApplyClick = this.onApplyClick.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
    this.onContactChange = this.onContactChange.bind(this);
    this.onAddClick = this.onAddClick.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
    this.getGeoLocation = this.getGeoLocation.bind(this);
    this.getPlaces = this.getPlaces.bind(this);
    this.onMarkerClick = this.onMarkerClick.bind(this);
  }

  async componentDidMount() {
    await this.getContacts();
    await this.onShowMyContactsClick();
    // this.state.contacts.map(contact => this.getGeoLocation(contact));
  }

  async getContacts() {
    const url = "http://localhost:3001/contacts";
    await axios
            .get(url)
            .then(response => 
              this.setState({ contacts: response.data }))
            .catch(error => {
              console.error(
                'There was an error!', error
              );
            });
  }

  async getPlaces() {
    // this.state.contactsInAddressList.map(contact => this.getGeoLocation(contact));
    this.loading = true;
    this.setState({ places : [] });
    // this.setState({ places : this.state.contactsInAddressList.map(contact => this.getGeoLocation(contact)) }, () => {this.loading = false});
    this.state.contactsInAddressList
      .map(contact => 
        this.getGeoLocation(contact));
    // this.setState({ places: this.state.places.map(place => place.show = false)})
  }

  async onShowMyContactsClick() {
    this.setState({ 
      contactsInAddressList: this.state.contacts.filter(
        contact => contact.owner === this.state.username),
    }, () => {
      this.getPlaces();
      this.loading = false;});
    // await this.getPlaces();
    // this.state.contactsInAddressList.map(async(contact) => await this.getGeoLocation(contact));
  }

  async onShowAllContactsClick() {
    let contacts = this.state.isAdmin 
      ? this.state.contacts 
      : this.state.contacts.filter(contact => 
        (contact.owner === this.state.username) 
          || (contact.owner === "admina" && !contact.isPrivate));
    this.setState({ 
      contactsInAddressList: contacts
    }, () => {
      this.getPlaces();
      this.loading = false;});
    // this.loading = true;
    // this.setState({ places : [] });
    // await this.getPlaces();
    // this.loading = false;
    // this.state.contactsInAddressList.map(async(contact) => await this.getGeoLocation(contact));
    // this.state.contactsInAddressList.map(contact => this.getGeoLocation(contact));
  }

  onAddNewContactsClick() {
    this.setState({ screen: 1 });
  }

  async postContact(contact) {
    const url = "http://localhost:3001/contacts";
    await axios
            .post(
              url, contact)
            .then((response) => {
              this.componentDidMount();
            })
            .catch(error => {
              console.error(
                'There was an error!', error
              );
            });
  }

  async deleteContact() {
    const url = "http://localhost:3001/contacts";
    await axios
            .delete(
              url+"/"+this.state.currentUserID)
            .then((response) => {
              this.componentDidMount();
            })
            .catch(error => {
              console.error(
                'There was an error!', error
              );
            });
  }

  async putContact(contact) {
    const url = "http://localhost:3001/contacts";
    await axios
            .put(
              url+"/"+this.state.currentUserID, contact)
            .then((response) => {
              this.componentDidMount();
            })
            .catch(error => {
              console.error(
                'There was an error!', error
              );
            });
  }

  onContactChange(contact) {
    this.setState({ currentContact: contact })
  }

  async onAddClick(event) {
    event.preventDefault();
    try {
      await this.getGeoLocation(this.state.currentContact);
      await this.postContact(this.state.currentContact);
      this.onBackClick();
    } catch (error) {
      alert(error.message);
    }
  }

  onBackClick() {
    this.setState({ screen: 0, currentContact: this.emptyContact, currentUserID:"" });
  }

  onAddressClick(_id) {
    this.setState({ screen: 2, currentUserID: _id});
  }

  async onApplyClick(event) {
    event.preventDefault();
    if (this.state.isAdmin 
      || this.state.username === this.state.contacts.filter(contact => 
        contact._id === this.state.currentUserID)[0].owner) 
    {
      try {
        await this.getGeoLocation(this.state.currentContact);
        await this.putContact(this.state.currentContact);
        this.onBackClick();
      } catch (error) {
        alert(error.message);
      }
    }
  }

  async onDeleteClick() {
    if (this.state.isAdmin 
      || this.state.username === this.state.contacts.filter(contact => 
        contact._id === this.state.currentUserID)[0].owner) 
    {
      await this.deleteContact();
      this.onBackClick();
    }
  }

  async getGeoLocation(contact) {
    let url = "https://maps.googleapis.com/maps/api/geocode/json?";
    url += "address=" 
      + contact.street 
      + " " + contact.streetnr 
      + " " + contact.zip 
      + " " + contact.city;
    url = url +"&key=";
    // let place = null;
    await axios
      .get(url)
      .then(response => {
        if (response.data.results.length === 0) {
          throw new Error("Incorrect Address!");
        }
        else {
          let place = response.data.results[0];
          place.show = false;
          place.opening_hours = {
            "open_now": false,
            "weekday_text": []
          };
          // return response.data.results[0];
          this.setState({currentContact: {
            ...this.state.currentContact, lat: place.geometry.location.lat, lng: place.geometry.location.lng}}, 
            () => this.setState({ places : [...this.state.places, place] }))
        }
      })
      // .catch(error => {
      //   console.error(
      //     'There was an error!', error
      //   );
      //   alert(error.message);
      // });
    // return place;
  }

  onMarkerClick(coords) {
    console.log(coords)
    const index = this.state.contactsInAddressList.findIndex((e) => e.lat === coords[0] && e.lng === coords[1]);
    this.loading = true;
    console.log(index)
    this.state.highlight === this.state.contactsInAddressList[index]._id 
      ? this.setState({ highlight: -1 })
      : this.setState({ highlight: this.state.contactsInAddressList[index]._id });
    this.loading = false;
  }

  render() {
    let owners = null;
    switch (this.state.screen) {
      case 0:
        return (
          <div id="main-screen" className="main-screen">
            <ButtonBar 
              onShowMyContactsClick={this.onShowMyContactsClick}
              onShowAllContactsClick={this.onShowAllContactsClick}
              onAddNewContactsClick={this.onAddNewContactsClick}
            />
            {!this.loading && <AddressList contacts={this.state.contactsInAddressList} onAddressClick={this.onAddressClick} highlight={this.state.highlight}/>}
            {!this.loading && this.state.places.length === this.state.contactsInAddressList.length && <Map places={this.state.places} onMarkerClick={this.onMarkerClick}/>}
          </div>
        );
      case 1:
        owners = this.state.contacts.map((contact) => contact.owner);
        owners = this.state.isAdmin ? [...new Set(owners)] : [this.state.username];
        return (
          <AddNewContacts 
            onAddClick={this.onAddClick} 
            onBackClick={this.onBackClick}
            onChange={this.onContactChange}
            owners={owners} 
          />
        );
      case 2:
        owners = this.state.contacts.map((contact) => contact.owner);
        owners = this.state.isAdmin ? [...new Set(owners)] : [this.state.username];
        return (
          <UpdateDeleteContact 
            contact={this.state.contacts.find(contact => contact._id === this.state.currentUserID)} 
            onApplyClick={this.onApplyClick} 
            onDeleteClick={this.onDeleteClick} 
            onBackClick={this.onBackClick}
            onChange={this.onContactChange}
            owners={owners} 
          />
        );
      default:
        break;
    }
  }
}

export default Body;
