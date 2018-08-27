'use strict';

import request from 'superagent';

const baseUrl = 'http://localhost:59034/api/';

export default class CountryService {
    static getAllCountries() {
        return new Promise((resolve, reject) => {
            request
            .get(baseUrl + 'Countries/GetAll')
            .set('Accept', 'application/json')
            .end((err, res) => {
                if(err) {
                    reject(err);
                }

                resolve(res.body);
            });
        });
    }
}