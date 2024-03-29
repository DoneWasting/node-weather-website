const request = require('request');

const geoCode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiZG9uZXdhc3RpbmciLCJhIjoiY2p0Z241emg2MDVydTQzcGYwemZ3b2R3cCJ9.RqASKvDf5khENsvrlcUidg&limit=1`;
    
    request({url, json: true}, (error, { body }) => {
        if(error){
            callback('Unable to connect to location services!', undefined);
        } else if(body.features.length === 0){
            callback('Unable to find location!. Try another search.', undefined);
        } else {
            
            callback(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            });
        }
    });
};

module.exports = geoCode;