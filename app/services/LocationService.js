import request from 'superagent';

const baseUrl = 'http://localhost:59034/api/';

export default class LocationService {
    static getAllLocations(userToken) {
        return new Promise((resolve, reject) => {
            request
                .get(baseUrl + 'Locations/All')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${userToken}`)
                .end((err, res) => {
                    if(err) { 
                        reject(err);
                    }
                    resolve(res.body);
                });
        });
    }

    static getLocationDetailsById(id, userToken) {
        return new Promise((resolve, reject) => {
            request
                .get(baseUrl + `Locations/GetLocationDetails?id=${id}`)
                .set('Content-Type', 'application/json')                
                .set('Authorization', `Bearer ${userToken}`)
                .end((err, res) => {
                    if(err) {
                        reject(err);
                    }
                    resolve(res.body);
                });
        });
    }

    static createLocation(location, userToken) {
        return new Promise((resolve, reject) => {
            request
                .post(baseUrl + 'Locations/Create')
                .send(location)
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .set('Authorization', `Bearer ${userToken}`)
                .end((err, res) => {
                    if(err) {
                        console.log(err);
                        reject(err);
                    }
                    resolve(res.body);
                });
        });
    }

    static uploadImage(data, locationId, userToken) {
        return new Promise((resolve, reject) => {
            request
                .post(baseUrl + 'Images/UploadPhoto')
                .send(data)
                .set('LocationId', `${locationId}`)
                .set('Authorization', `Bearer ${userToken}`)                
                .end((err, res) => {
                    if(err) {
                        console.log(err);
                        reject(err);
                    }
                    resolve(res.body);
                });
        });
    }
}