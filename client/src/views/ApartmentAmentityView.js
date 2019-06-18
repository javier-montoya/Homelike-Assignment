import React from 'react';

export default class ApartmentAmentityView extends React.Component {
  render() {
    let {amenities, limit = 3} = this.props;
    
    // Removed the unnecessary declarations and html wrapping the item
    // also, .map should return a value so we slice the array beforehand
    return amenities.slice(0, limit)
      .map(item => <span className="pad-left-5">{item}</span>)
  }
}
