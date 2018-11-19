const request = require('request');
const weather_key = require('../api.json');
var getWeather = (lat, lon, callback) =>{
    request({
        url:`https://api.darksky.net/forecast/${weather_key.weather_key}/${lat},${lon}`,
        json:true
    },(error, response, body)=>{
        if(!error && response.statusCode === 200){
            callback(undefined,{
                temperature: body.currently.temperature,
                apparentTemperature: body.currently.apparentTemperature
            });
        } else {
            callback('Unable to fetch weather');
        }
    });
}


module.exports.getWeather = getWeather;
