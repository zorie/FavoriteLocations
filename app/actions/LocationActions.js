import alt from '../libs/alt.js';
import LocationService from '../services/LocationService.js';
import AuthStore from '../stores/AuthStore.js';

export class LocationAction {
    getAllLocations() {
        let userToken = AuthStore.getToken();
        return (dispatch) => {
            LocationService.getAllLocations(userToken)
                .then((res) => {
                    dispatch(res);
                })
                .catch((err) => {
                    console.log(err);
                });
        };
    }

    getLocationDetailsById(id) {
        let userToken = AuthStore.getToken();
        
        return (dispatch) => {
            LocationService.getLocationDetailsById(id, userToken)
                .then((res) => {
                    dispatch(res);
                })
                .catch((err) => {
                    console.log(err);
                });
        };
    }

    createLocation(location, data) {
        let userToken = AuthStore.getToken();
        
        return (dispatch) => {

            LocationService.createLocation(location, userToken)
                .then((res) => {
                    LocationService.uploadImage(data, res.Id, userToken)
                        .then((response) => {
                             dispatch(res);
                        })
                        .catch((error) => {
                            console.log('image upload fail');
                        });
                })
                .catch((err) => {
                    console.log(err);
                });
        };
    }
}

export default alt.createActions(LocationAction);