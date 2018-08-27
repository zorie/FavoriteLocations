'use strict';

import alt from '../libs/alt.js';
import request from 'superagent';

const baseUrl = 'http://localhost:59034/api/';

export default class UserService {
   static addToFavorites(locationId, userToken) {
       return new Promise((resolve, reject) => {
        request
            .post(baseUrl + `User/FavoriteLocation/${locationId}`)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .set('Authorization', `Bearer ${userToken}`)
            .end((err, res) => {
                if(err) {
                    reject(err);
                }
                
                resolve(res.body);
            });
        });
   }

   static removeFromFavorites(locationId, userToken) {
       return new Promise((resolve, reject) => {
        request
            .post(baseUrl + `User/UnfavoriteLocation/${locationId}`)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .set('Authorization', `Bearer ${userToken}`)
            .end((err, res) => {
                if(err) {
                    reject(err);
                }

                resolve(res);
            });
       });
   }
}