import React from 'react';
import {connect} from 'react-redux';
import {fetchLocations} from './../actions/locationActions';
import {fetchApartmentsByLocation} from './../actions/apartmentsListActions';
import ApartmentTileView from "./ApartmentTileView";
import TagInput from "./TagInput";
import 'react-dropdown/style.css'

class SearchView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        location: '',
        
        // these are the filters
        size: '',
        price: '',
        amenities: [],
        details: [],
        services: []
    };
  }

  // since apartments dont have a location because of a back-end error, we get the list here, and match by name when needed
  componentDidMount() {
    this.props.fetchLocations();
  }

  applyFilter (properties, filters) {
    if ( filters.length === 0 ) return true;
    let shouldAdd = filters.every( val => properties.indexOf(val.id) >= 0 );
    return shouldAdd;
  }

  // as the name suggests, we check each filter and only render the passing elements.
  renderMatching() {
    let { amenities, details, services, size, price } = this.state;
    let { apartmentsList } = this.props;

    if(!apartmentsList) return null;

    let apartmentsToRender = apartmentsList.filter((apartment) => {   
      let detailsArray = this.formatDetails(apartment.details);
      return this.applyFilter(apartment.amenities, amenities) &&
      this.applyFilter(apartment.services, services) &&
      this.applyFilter(detailsArray, details) &&
      (size == '' || apartment.size == size) &&
      (price == '' || apartment.price == price)
    }
    )
    
    return (
      <div className="standard-top-margin">
        <div className="view-apartment-list">
          {apartmentsToRender.map((item, index) => (
              <ApartmentTileView key={index} apartment={item} />
          ))}
        </div>
      </div>
    )
  }

  // details come inside objects, we need to compare strings
  formatDetails (detailsObject) {
    let detailKeys = Object.keys(detailsObject);
    return detailKeys.map( detailKey => `${detailsObject[detailKey]} ${detailKey}` )
  } 

  // adding a new filter
  handleAddition = (filterName, tag) => {
    let filters = this.state[filterName];
    filters.push(tag);
    this.setState({ [filterName]: filters });
  }

  // remove a filter
  handleDelete = (filterName, i) => {
    this.setState({
     [filterName]: this.state[filterName].filter((tag, index) => index !== i),
    });
  }

  // name matching to get the id and perform the search
  fetchByLocationName = () => {
    let locationName = this.state.location;
    let {locations} = this.props;
    let location = locations.find((location) => location.title === locationName);
    if(location)
      this.props.fetchApartmentsByLocation(location.id);
  }

  render() {
    let { locations } = this.props;

    if (!Object.keys(locations).length) {
        return <div>Loading...</div>
    }

    return (
      <div className="standard-top-margin col-12 col-md-10 center-column">
        <div className="col-12 col-md-9">

          <div className="col-md-12">
          <input className="form-control" placeholder="Location" onChange={(event) => { this.setState({location: event.target.value}) } } /> 
            {this.renderMatching()} 
          </div>
          
        </div>

        <div className="col-4 col-md-2">

          <div className="form-group">
            <button type="button" className="btn btn-primary form-control" onClick={()=>{this.fetchByLocationName()}}>Search</button>
          </div>

          {/* These are the filter inputs */}
          {/* I made them tag inputs as a preference, this means each filter appears below the input field */}
          <div className="form-group standard-top-margin">
            <label>Amenities</label> 
            <TagInput 
              tags={this.state.amenities}
              tagArrayName = 'amenities'
              placeholder = 'television, elevator'
              handleAddition = { this.handleAddition }
              handleDelete={ this.handleDelete }
            />
          </div>
          <div className="form-group">
            <label>Details</label> 
            <TagInput 
              tags={this.state.details}
              tagArrayName = 'details'
              placeholder = '2 bathrooms, 2 rooms'
              handleAddition = { this.handleAddition }
              handleDelete={ this.handleDelete }
            />
          </div>

          <div className="form-group">
            <label>Services</label> 
            <TagInput 
              tags={this.state.services}
              tagArrayName = 'services'
              placeholder = 'cleaning, laundry'
              handleAddition = { this.handleAddition }
              handleDelete={ this.handleDelete }
            />
          </div>

          <div className="form-group"><label>Size</label>
                <input type="number" className="form-control" onChange={(event) => { this.setState({size: event.target.value}) } } />
              </div>
          <div className="form-group"><label>Price</label> 
                <input type="number" className="form-control" onChange={(event) => { this.setState({price: event.target.value}) } } /> 
          </div>

          <div className="form-group">
            <span className="text-muted">*Add multiple filters with <b>enter</b></span>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  locations: state.locations.items,
  apartmentsList: state.apartmentsList.apartments.items
});

export default connect(mapStateToProps, {fetchLocations, fetchApartmentsByLocation})(SearchView)
