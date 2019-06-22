import {FETCH_LOCATIONS} from "./types";
import gql from "graphql-tag";
import client from './../ApolloClient'

export const fetchLocations = () => dispatch => {
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
.then(locations => {
  console.log("locations: ", locations);
  console.log("locations.data: ", locations.data);

  let formattedLocations = locations.data.locations.items.map(locationItem => {
    return { id: locationItem._id, title: locationItem.title }
  })

  console.log("formatted locations", formattedLocations);

  return dispatch({
    type: FETCH_LOCATIONS,
    payload: { locations: formattedLocations }
  })
});
};
