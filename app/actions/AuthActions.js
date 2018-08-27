'use strict';

import alt from '../libs/alt.js';
import AuthService from '../services/AuthService.js';
import { browserHistory } from 'react-router';
import LocationActions from '../actions/LocationActions.js';
import AuthStore from '../stores/AuthStore.js';

class AuthActions {
    constructor() {
        
    }

    registerUser(user) {
        return (dispatch) => {
            AuthService.register(user)
                .then((res) => {
                    dispatch({ message:res.Message });
                })
                .catch((err) => {
                    console.log(err);
                });
        };
    }

    loginUser(user) {  
        let requestBody = {
            username: user.username,
            password: user.password,
            grant_type: "password"
        };

        return (dispatch) => {
            AuthService.login(requestBody)
                .then((res) => {
                    dispatch(res);
                })
                .catch((err) => {
                    console.log(err);
                });
        };
    }

    logoutUser(token) {
        return (dispatch) => {
            AuthService.logout(token)
                .then((res) => {
                    dispatch(res);
                        LocationActions.getAllLocations(AuthStore.getToken());                
                    browserHistory.push('/');
                })
                .catch((err) => {
                    console.log(err);
                });
        };
    }
}

export default alt.createActions(AuthActions);