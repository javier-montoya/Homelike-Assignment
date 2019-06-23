import React, {Component} from 'react';
import {ApolloProvider} from 'react-apollo';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import {Provider} from 'react-redux';
import HomeView from './views/HomeView';
import LocationsView from './views/LocationsView';
import client from './ApolloClient';
import store from './store';
import ApartmentView from "./views/ApartmentView";
import SearchView from './views/SearchView';

export default class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Provider store={store}>
          <Router>
            <Switch>
              <Route exact path="/" component={HomeView}/>
              <Route exact path="/apartments/:apartmentId" component={ApartmentView}/>
              <Route exact path="/locations" component={LocationsView}/>
              <Route exact path="/search" component={SearchView}/>
              <Route component={()=> <h4>404 - page does not exist.</h4> }/>
            </Switch>
          </Router>
        </Provider>
      </ApolloProvider>
    );
  }
}
