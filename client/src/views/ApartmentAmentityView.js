import React from 'react';
import PropTypes from 'prop-types';

export default class ApartmentAmentityView extends React.Component {
  render() {
    let {amenities, limit = 3} = this.props;
    
    // Removed the unnecessary declarations and html wrapping the item
    // also, .map should return a value so we slice the array beforehand
    return amenities.slice(0, limit)
      .map((item, index) => <span key={`amenity-${index}`} className="pad-left-5">{item}</span>)
  }
}

// added proptypes
ApartmentAmentityView.propTypes = {
  limit: PropTypes.number,
  amenities: PropTypes.arrayOf(PropTypes.string).isRequired
}
