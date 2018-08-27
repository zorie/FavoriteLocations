import alt from '../libs/alt.js';
import { browserHistory } from 'react-router';
import AuthActions from '../actions/AuthActions.js';

class AuthStore {
    constructor() {
        this.state = {
            user: {},
            authenticatedUser: false
        };

        this.exportPublicMethods({
            isAuthenticated: this.isAuthenticated,
            getUser: this.getUser,
            getToken: this.getToken
        });

        this.bindListeners({
            registerUser: AuthActions.REGISTER_USER,
            loginUser: AuthActions.LOGIN_USER,
            logoutUser: AuthActions.LOGOUT_USER            
        });
    }

    registerUser(message) {        
        browserHistory.push('/login');        
    }

    loginUser(user) {
        this.setState({
            user: user,
            authenticatedUser: true
        });

        browserHistory.push('/dashboard');

        localStorage.setItem('user', JSON.stringify(user));
    }

    logoutUser() {
        let userToBeLoggedOut = {};
        this.setState({
            user: userToBeLoggedOut,
            authenticatedUser: false
        });

        localStorage.removeItem('user');
        browserHistory.push('/');
    }

    isAuthenticated() {
        if(this.state.user.access_token) {
            return true;
        }

        return false;
    }

    getUser() {
        return this.state.user;
    }

    getToken() {
        return this.state.user.access_token;
        // return JSON.parse(localStorage.getItem('user')).access_token;
    }
}

export default alt.createStore(AuthStore, 'AuthStore');