import {FETCH_APARTMENTS_LIST} from "./types";
import gql from "graphql-tag";
import client from './../ApolloClient'

export const fetchApartmentsByLocation = (locationId) => dispatch => {
  client.query({
    query: gql`
    {
      apartments(location: "${locationId}") {
        items {
          _id
          owner {
            _id
            email
          }
          title
          location {
            _id
            title
          }
          size
          price
          amenities
          images
          details {
            rooms
            bedrooms
            floor
            bathrooms
          } 
          services 
        }
      }
    }`
  })
  .then(apartments => dispatch({
      type: FETCH_APARTMENTS_LIST,
      payload: apartments.data
    })
  );
}

export const fetchApartmentsList = () => dispatch => {
  client.query({
    query: gql`
    {
      apartments(active: true) {
        items {
          _id
          owner {
            _id
            email
          }
          title
          location {
            _id
            title
          }
          size
          price
          amenities
          images
        }
      }
    }`
  })
  .then(apartments => dispatch({
    type: FETCH_APARTMENTS_LIST,
      payload: apartments.data
    })
  );
};
