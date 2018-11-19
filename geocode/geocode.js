const request = require('request');   
const yargs = require('yargs');

var geocodeAddress = (address, callback)=>{

var encodedAddress = encodeURIComponent(address);

// var json_file = fs.readFileSync('city.json', 'utf-8');
//     json_file_body = JSON.parse(json_file) 
//     console.log(json_file_body[0].place_id);


request({
    url:`https://us1.locationiq.com/v1/search.php?key=27aecf48badf45&q=${encodedAddress}&format=json`,
    json:true
}, (error, response, body)=>{
    if(error){
        callback('Unable to connect to Google servers');
    } else if(response.body.error === 'Unable to geocode'){
        callback('Unable to find that adress')
    } else if(response.statusCode === 200){
        callback(undefined, {
            address: response.body[0].display_name,
            latitude: response.body[0].lat,
            longitude: response.body[0].lon
        });
        // console.log(`Address: ${response.body[0].display_name}`);
        // console.log(`Latitude: ${response.body[0].lat}`);
        // console.log(`Longitude: ${response.body[0].lon}`);
    }
});

}


module.exports.geocodeAddress = geocodeAddress;

