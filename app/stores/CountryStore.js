import alt from '../libs/alt.js';
import CountryActions from '../actions/CountryActions.js';

class CountryStore {
    constructor() {
        this.state = {
            countries: []
        };

        this.bindListeners({
            getAllCountries: CountryActions.GET_ALL_COUNTRIES
        });
    }

    getAllCountries(countries) {
        this.setState({
            countries: countries
        });
    }
}

export default alt.createStore(CountryStore, 'CountryStore');