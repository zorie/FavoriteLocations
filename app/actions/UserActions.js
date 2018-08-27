'use strict';

import alt from '../libs/alt.js';
import UserService from '../services/UserService.js';

class UserActions {
    addToFavorites(locationId, userToken) {
        return (dispatch) => {
            UserService.addToFavorites(locationId, userToken)
                .then((res) => {
                   dispatch(res); 
                })
                .catch((err) => {
                    console.log(err);
                });
        };
    }

    removeFromFavorites(locationId, userToken) {
        return (dispatch) => {
            UserService.removeFromFavorites(locationId, userToken)
            .then((res) => {
                dispatch(res);
            })
            .catch((err) => {
                console.log(err);
            });
        };
    }
}

export default alt.createActions(UserActions);
