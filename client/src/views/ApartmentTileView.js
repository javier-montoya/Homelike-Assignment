import React from 'react';
import ApartmentData from "./ApartmentData";

export default class ApartmentTileView extends React.Component {

  render() {
    let {apartment} = this.props;
    let url = '/apartments/' + apartment._id;

    return (
      <div className="view-apartment-item">
        <div className="view-apartment-item-content">
          <a target ="_blank" href={url}>
            <ApartmentData
              image = {apartment.images[0]}
              price = {apartment.price}
              title = {apartment.title}
              size = {apartment.size}
              amenities = {apartment.amenities}
              backgroundSize = 'cover'
            />
          </a>
        </div>
      </div>
    )
  }
}
