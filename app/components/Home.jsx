import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Card, CardHeader, CardText} from 'material-ui/Card';
import {GridList, GridTile} from 'material-ui/GridList';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import RaisedButton from 'material-ui/RaisedButton';
import LocationStore from '../stores/LocationStore.js';
import connectToStores from 'alt-utils/lib/connectToStores';
import LocationActions from '../actions/LocationActions.js';
import LocationsForm from './Location/LocationsForm.jsx';
import AuthStore from '../stores/AuthStore.js';
import UserActions from '../actions/UserActions.js';
import 'bootstrap/dist/css/bootstrap.min.css';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: 800,
    height: 800,
    overflowY: 'auto',
  },
};

class Home extends React.Component {
    static getStores() {
        return [LocationStore];
    }

    static getPropsFromStores() {
        return LocationStore.getState();
    }

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        LocationActions.getAllLocations(AuthStore.getToken());                
    }
    
    addToFavorites = (locationId) => {  
        UserActions.addToFavorites(locationId, AuthStore.getToken());
    }

    removeFromFavorites = (locationId) => {
        UserActions.removeFromFavorites(locationId, AuthStore.getToken());
    }

    render() {
        return (
            <div className="container">
                <LocationsForm 
                    locations={this.props.locations} 
                    addToFavorites={this.addToFavorites}
                    removeFromFavorites={this.removeFromFavorites}
                    isAuthorized={AuthStore.isAuthenticated()} />
            </div>
        );
    }
}

Home.propTypes = {
    locations: PropTypes.array
};

export default connectToStores(Home);