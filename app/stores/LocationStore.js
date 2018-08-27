import alt from '../libs/alt.js';
import { browserHistory } from 'react-router';
import LocationActions from '../actions/LocationActions.js';
import AuthActions from '../actions/AuthActions.js';

class LocationStore {
    constructor() {
        this.state = {
            locations: [],
            selectedLocation: {}
        };

        this.bindListeners({
            getAllLocations: LocationActions.GET_ALL_LOCATIONS,
            getLocationDetailsById: LocationActions.GET_LOCATION_DETAILS_BY_ID,
            createLocation: LocationActions.CREATE_LOCATION,
        });
    }

    getAllLocations(locations) {
        this.setState({
            locations: locations
        });
    }

    getLocationDetailsById(responseLocation) {
        this.setState({
            selectedLocation: responseLocation
        });
    }

    createLocation(createdLocation) {
        browserHistory.push('/locations');
    }
}

export default alt.createStore(LocationStore, 'LocationStore');