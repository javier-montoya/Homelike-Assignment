import React from 'react';
import Dropdown from 'react-dropdown'
import {connect} from 'react-redux';
import {fetchLocations} from './../actions/locationActions';
import {fetchApartmentsByLocation} from './../actions/apartmentsListActions';
import ApartmentTileView from "./ApartmentTileView";
import 'react-dropdown/style.css'

class LocationsView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentOption: ''
    };
  }

  componentDidMount() {
    this.props.fetchLocations();
  }

  renderApartments = () => {
    let { apartmentsList } = this.props;
    if(!apartmentsList) return null;
    return (
      <div className="view-apartment-list standard-top-margin">
        {apartmentsList.map((item, index) => (
            <ApartmentTileView key={index} apartment={item} />
        ))}
      </div>
    )
  }

  onDropdownChange = (option) => {
    this.setState ({ currentOption: option.label });
    this.props.fetchApartmentsByLocation(option.value);
  }

  render() {
    let { locations } = this.props;
    let { currentOption } = this.state;

    if (!Object.keys(locations).length) {
        return <div>Loading...</div>
    }

    let options = locations.map(location => {
      return { value: location.id, label: location.title }
    })

    return (
      <div className="standard-top-margin center-column col-12 col-md-8">
        <div className="center-horizontally">
          <h4 className="mb-10">We have apartments in all sorts of venues!</h4>
          <Dropdown 
            options={options} 
            placeholder="Select a location" 
            value = {currentOption}
            onChange={ this.onDropdownChange }
          />
          
          {this.renderApartments()}

        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  locations: state.locations.items,
  apartmentsList: state.apartmentsList.apartments.items
});

export default connect(mapStateToProps, {fetchLocations, fetchApartmentsByLocation})(LocationsView)
