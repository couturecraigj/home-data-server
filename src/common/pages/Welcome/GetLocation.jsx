import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const ADD_LOCATION = gql`
  mutation AddLocation($input: LocationInput!) {
    addLocation(input: $input) {
      id
    }
  }
`;

class LocationButton extends React.Component {
  state = {
    lat: null,
    lon: null
  };
  getLocation = fn => () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const coords = {
          lat: position.coords.latitude,
          lon: position.coords.longitude
        };

        fn({ variables: { input: coords } });
        this.setState(coords);
      });
    }
  };
  render() {
    const { lat, lon } = this.state;

    if (lat && lon) {
      const coords = `${lat}, ${lon}`;

      return <div>{coords}</div>;
    }

    return (
      <Mutation mutation={ADD_LOCATION}>
        {addLocation => (
          <button type="button" onClick={this.getLocation(addLocation)}>
            Get Location
          </button>
        )}
      </Mutation>
    );
  }
}

export default LocationButton;
