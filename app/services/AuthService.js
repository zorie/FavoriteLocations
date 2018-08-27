'use strict';

import request from 'superagent';

const baseUrl = 'http://localhost:59034/api/';

export default class Auth {
    static register(user) {
        return new Promise((resolve, reject) => {
            request
            .post(baseUrl + 'Account/register')
            .send(user)
            .set('Accept', 'application/json')
            .end((err, res) => {
                if(err) {
                    reject(err);
                }
                
                resolve(res.body);
            });
        });
    }
    
    static login(requestUser) {
        return new Promise((resolve, reject) => {
            request
            .post(baseUrl + 'users/login')
            .send(requestUser)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .end((err, res) => {
                if(err) {
                    reject(err);
                }
                
                resolve(res.body);
            });
        });
    }

    static logout(token) {    
        return new Promise((resolve, reject) => {
            request
                .post(baseUrl + 'Account/Logout')
                .set('Authorization', `Bearer ${token}`)
                .end((err, res) => {
                    if(err) {
                        reject(err);
                    }

                    resolve(res.body);
                });
                
        }); 
    }
}