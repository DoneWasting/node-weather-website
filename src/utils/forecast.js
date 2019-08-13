const request = require('request');


const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/1e078f6195ed8aef5a5f353ed089b143/${latitude},${longitude}?units=si&lang=es`
    
    request({url, json:true}, (error, { body }) => {
        if(error){
            callback('Unable to connect to weather services!', undefined);
        } else if (body.error){
            callback('Unable to find location', undefined);
        } else {
            callback(undefined, `Current temperature is ${body.currently.temperature} celcius, with a probability for rain of ${body.currently.precipProbability}%, the hotter it can get is ${body.daily.data[0].temperatureMax} Celcius and the colder it can get is ${body.daily.data[0].temperatureMin} Celcius`);
        }
    })
}


module.exports = forecast;