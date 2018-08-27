import alt from "../libs/alt.js";
import NotificationActions from "../actions/NotificationActions.js";
import AuthActions from '../actions/AuthActions.js';
import LocationActions from '../actions/LocationActions.js';

class NotificationStore {
    constructor() {
        this.state = {
            message: ""
        };

        this.exportPublicMethods({
            getMessage: this.getMessage
        });

        this.bindListeners({
            resetState: NotificationActions.RESET_STATE,
            registerUser: AuthActions.REGISTER_USER,
            createdLocation: LocationActions.CREATE_LOCATION
        });  
    }

    registerUser(message) {
        this.setState({
            message: 'Successfully registered'
        });
    }

    resetState(state) {
        this.setState({
            message: ""
        });
    }

    createdLocation(createdLoc) {
        this.setState({
            message: 'Successfully created'
        });
    }

    getMessage() {
        return this.getState()['message'];
    }
}

export default alt.createStore(NotificationStore, 'NotificationStore');