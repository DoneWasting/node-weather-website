const request = require('request');


const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/1e078f6195ed8aef5a5f353ed089b143/${latitude},${longitude}?units=si&lang=es`
    
    request({url, json:true}, (error, { body }) => {
        if(error){
            callback('Unable to connect to weather services!', undefined);
        } else if (body.error){
            callback('Unable to find location', undefined);
        } else {
            console.log(body.daily.data[0].temperatureMin);
            callback(undefined, `${body.daily.data[0].summary} Hacen  ${body.currently.temperature} grados celcius, con una probabilidad de lluvia de ${body.currently.precipProbability}%, una temperatura maxima de ${body.daily.data[0].temperatureMax} Celcius y una temperatura minima de ${body.daily.data[0].temperatureMin}`);
        }
    })
}


module.exports = forecast;