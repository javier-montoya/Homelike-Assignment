import {FETCH_APARTMENTS_LIST} from "./types";
import gql from "graphql-tag";
import client from './../ApolloClient'

export const fetchApartmentsByLocation = (locationId) => dispatch => {
  console.log("fetching by location...");
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
        }
      }
    }`
  })
  .then(apartments => 
    {
      console.log("apartments data in a location ", apartments.data)
      return   dispatch({
        type: FETCH_APARTMENTS_LIST,
        payload: apartments.data
      })
    }

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
.then(apartments => {
  console.log("apartments data", apartments.data)
  return dispatch({
    type: FETCH_APARTMENTS_LIST,
    payload: apartments.data
  })
});
};


