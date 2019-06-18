import React from 'react';
import {fetchApartment} from "../actions/apartmentActions";
import {connect} from "react-redux";
import ApartmentData from "./ApartmentData";

export class ApartmentView extends React.Component {
  componentWillMount() {
    const { match: { params } } = this.props;
    const { apartmentId } = params;
    this.props.fetchApartment(apartmentId);
  }

  render() {
    const { apartment } = this.props;
    if (!Object.keys(apartment).length) {
      return <div>Loading...</div>
    }
    return (
      <div className='container-fl clearfix'>
        <div className='col-12'>
          <div className='view-apartment'>
            <div className="view-apartment-item">
              <div className="view-apartment-item-content">
                <ApartmentData 
                  image = {apartment.images[0]}
                  price = {apartment.price}
                  title = {apartment.title}
                  size = {apartment.size}
                  amenities = {apartment.amenities}
                  backgroundSize = 'contain'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  apartment: state.apartmentItem.apartment
});

export default connect(mapStateToProps, {fetchApartment})(ApartmentView)
