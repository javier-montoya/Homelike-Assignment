import React from 'react';
import ApartmentAmentityView from "./ApartmentAmentityView";
import PropTypes from 'prop-types';

// pure component for optimization purposes
export default class ApartmentData extends React.PureComponent {

  render() {
    let {image, price, title, size, amenities, backgroundSize} = this.props;
    let imageSource = 'http://localhost:5000/images/apartments/' + image;

    return (
        // renamed classes, removed unnecesary ones and merged the ones that made sense.
        <React.Fragment>
          <div className="listing-image">
            {/* Removed as many in-line styles as I could, the ones left depend on props */}
            <div className="media-cover" style={{backgroundImage: `url(${imageSource})`, backgroundSize}}></div>
            <div className="price-tag">
              <span>{price} €</span>
              <span className="text-light-white">
                <span className="slash-padding">/</span>
                <span>Monat</span>
              </span>
            </div>
          </div>
          <div className="listing-details text-truncate">
            <div className="text-blue">
              <span>{title}</span>
            </div>
            <span className="text-simple">{size} m²</span>
            <div className="text-grey">
              <ApartmentAmentityView amenities={amenities} />
            </div>
          </div>
        </React.Fragment>
    )
  }
}

// added proptypes
ApartmentData.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  size: PropTypes.number.isRequired,
  amenities: PropTypes.arrayOf(PropTypes.string).isRequired
}