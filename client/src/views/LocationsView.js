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
      dropdownOptions: []
    };
  }

  componentDidMount() {
    this.props.fetchLocations();
  }

  renderApartments = () => {
    console.log("i ran... ");
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

  render() {
    let { locations, apartmentsList } = this.props;

    if (!Object.keys(locations).length) {
        return <div>Loading...</div>
    }

    let options = locations.map(location => {
      return { value: location.id, label: location.title }
    })

    return (
      <div className="standard-top-margin container-lg">
        <div className="full-width center-horizontally">
          <span>We have apartments in all sorts of venues!</span>
          <Dropdown 
          options={options} 
          onChange={ (option) => {
            console.log("triggering event", option)
            this.props.fetchApartmentsByLocation(option.value) 
          }}
          placeholder="Select a location" />
          
          {this.renderApartments()}

        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  // fetchGlobalProgram: programId => dispatch(fetchGlobalProgram(programId))
  fetchLocations: () => dispatch(fetchLocations()),
  fetchApartmentsByLocation: (locationId) => dispatch(fetchApartmentsByLocation(locationId))
});

const mapStateToProps = state => ({
  locations: state.locations.items,
  apartmentsList: state.apartmentsList.apartments.items
});

export default connect(mapStateToProps, mapDispatchToProps)(LocationsView)
