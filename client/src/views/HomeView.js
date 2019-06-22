import React from 'react';
import {connect} from 'react-redux';
import {fetchApartmentsList} from './../actions/apartmentsListActions';
import ApartmentTileView from "./ApartmentTileView";

class HomeView extends React.Component {
  // Component will mount is deprecated, used a suitable substitute
  componentDidMount() {
    this.props.fetchApartmentsList();
  }

  render() {
    let {apartmentsList} = this.props;
    if (!Object.keys(apartmentsList).length) {
        return <div>Loading...</div>
    }

    return (
      <div className="standard-top-margin container-lg">
        <div className="view-apartment-list">
          {apartmentsList.items.map((item, index) => (
              <ApartmentTileView key={index} apartment={item} />
          ))}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  apartmentsList: state.apartmentsList.apartments
});

export default connect(mapStateToProps, {fetchApartmentsList})(HomeView)
