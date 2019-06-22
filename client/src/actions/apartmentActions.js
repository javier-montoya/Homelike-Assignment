import {FETCH_APARTMENT} from "./types";
import gql from "graphql-tag";
import client from './../ApolloClient'

export const fetchApartment = (_id) => dispatch => {
  client.query({
    query: gql`
    {
      locations(active: true) {
        items {
          _id
          title
        }
      }
    }`
  })
  .then(response => {
    console.log("TEST response: ", response);
  })

  client.query({
    query: gql`
    {
      apartment(_id: "${_id}") {
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
        images
        amenities
        details {
          rooms
          bedrooms
          floor
          bathrooms
        } 
        services 
      }
    }`
})
.then(apartment => 
  {
    console.log("data: ", apartment.data);
    return   dispatch({
      type: FETCH_APARTMENT,
      payload: apartment.data
    })
  }

);
};


