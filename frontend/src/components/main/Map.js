// Reference: https://github.com/google-map-react/google-map-react-examples/blob/master/src/examples/MarkerInfoWindow.js
import React, { Component } from 'react';
import isEmpty from 'lodash.isempty';

// examples:
import GoogleMap from './GoogleMap';

const MITTE = {lat:	52.531677, lng:	13.381777};

// InfoWindow component
const InfoWindow = (props) => {
  const { place } = props;
  const infoWindowStyle = {
    position: 'relative',
    bottom: 150,
    left: '-45px',
    width: 220,
    backgroundColor: 'white',
    boxShadow: '0 2px 7px 1px rgba(0, 0, 0, 0.3)',
    padding: 10,
    fontSize: 14,
    zIndex: 100,
  };

  return (
    <div style={infoWindowStyle}>
      <div style={{ fontSize: 16 }}>
        {place.name}
      </div>
      <div style={{ fontSize: 14 }}>
        <span style={{ color: 'grey' }}>
          {place.rating}
          {' '}
        </span>
        <span style={{ color: 'orange' }}>
          {String.fromCharCode(9733).repeat(Math.floor(place.rating))}
        </span>
        <span style={{ color: 'lightgrey' }}>
          {String.fromCharCode(9733).repeat(5 - Math.floor(place.rating))}
        </span>
      </div>
      <div style={{ fontSize: 14, color: 'grey' }}>
        {place.types[0]}
      </div>
      <div style={{ fontSize: 14, color: 'grey' }}>
        {'$'.repeat(place.price_level)}
      </div>
      <div style={{ fontSize: 14, color: 'green' }}>
        {place.opening_hours.open_now ? 'Open' : 'Closed'}
      </div>
    </div>
  );
};

// Marker component
const Marker = ({ show, place }) => {
  const markerStyle = {
    border: '1px solid white',
    borderRadius: '50%',
    height: 20,
    width: 20,
    backgroundColor: show ? 'red' : 'blue',
    cursor: 'pointer',
    zIndex: 10,
  };

  return (
    <div>
      <div style={markerStyle} />
      {show && <InfoWindow place={place} />}
    </div>
  );
};

class Map extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      places: this.props.places
    };

    this.onChildClickCallback = this.onChildClickCallback.bind(this);
  }

  onChildClickCallback = (key) => {
    const index = this.state.places.findIndex((e) => e.place_id === key);
    this.props.onMarkerClick([this.state.places[index].geometry.location.lat, this.state.places[index].geometry.location.lng]);
  };

  render() {
    const { places } = this.state;

    return (
      <div id="map">
        {!isEmpty(places) && (
          <GoogleMap
            defaultZoom={10}
            defaultCenter={MITTE}
            bootstrapURLKeys={{ key: process.env.REACT_APP_MAP_KEY }}
            onChildClick={this.onChildClickCallback}
          >
            {places.map((place) => (
              <Marker
                key={place.place_id}
                lat={place.geometry.location.lat}
                lng={place.geometry.location.lng}
                show={place.show}
                place={place}
              />
            ))}
          </GoogleMap>
        )}
      </div>
    );
  }
}

export default Map;