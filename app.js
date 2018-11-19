const api = require('./api.json');
const yargs = require('yargs');
const axios = require('axios');
// const weather_key = require('./weather/weather.js');

const argv = yargs
    .options({  
        a:{
            demand: true,
            alias:'address', 
            describe:'Address to fetch weather for',
            string:true
        }
    })
    .help()
    .alias('help', 'h')
    .argv
var encodedAddress = encodeURIComponent(argv.address);
var geocodeUrl = `https://us1.locationiq.com/v1/search.php?key=27aecf48badf45&q=${encodedAddress}&format=json`;


axios.get(geocodeUrl).then((response)=>{
    if(response.data.statusCode === 404){
        throw new Error('Unable to find that address')
    }
    var lat = response.data[0].lat;
    var lon =response.data[0].lon;   
    
    var weatherUrl =`https://api.darksky.net/forecast/${api.weather_key}/${lat},${lon}`;
    console.log(response.data[0].licence);
    return axios.get(weatherUrl);

}).then((response)=>{
    console.log(response.data);
    var temperature = response.data.currently.temperature;
    var apparentTemperature = response.data.currently.apparentTemperature;
    console.log(`It's currently ${temperature}. It feels like ${apparentTemperature}`);
}).catch((err)=>{
    if(err.code === 'ENOTFOUND'){
        console.log('Unable to connenct to API Server');
    }else {
        console.log(err.message);
    }
});
