'use strict';

import alt from '../libs/alt.js';
import CountryService from '../services/CountryService.js';

class CountryActions {
    getAllCountries() {
        return (dispatch) => {
            CountryService.getAllCountries()
                .then((res) => {
                    dispatch(res);
                })
                .catch((err) => {
                    console.log(err);
                });
        };
    }
}

export default alt.createActions(CountryActions);