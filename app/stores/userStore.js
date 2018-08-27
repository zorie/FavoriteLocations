import alt from '../libs/alt.js';
import UserActions from '../actions/UserActions.js';

class UserStore {
    constructor() {
        this.state = {
            favoriteLocations: []
        };

        this.bindListeners({
            addToFavorites: UserActions.ADD_TO_FAVORITES,
        });
    }

    addToFavorites() {        
        // nothing, just the button gets colored
    }
}

export default alt.createStore(UserStore, 'UserStore');