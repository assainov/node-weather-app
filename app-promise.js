
const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
            .options({
                a: {
                    demand: true,
                    alias: 'address',
                    describe: 'Address to fetch weather for',
                    string: true,
                    default: 'vancouver'
                }
            })
            .help()
            .alias('help', 'h')
            .argv;


const geocodeAPI = {
    id: 'i6OKM9fx7ip6OlXxXuTd',
    code: 'tZFf2f6d-D0N6neIPN0OIg'
};

let encodedAddress = encodeURIComponent(argv.address);
const geocodeUrl = `https://geocoder.api.here.com/6.2/geocode.json?app_id=${geocodeAPI.id}&app_code=${geocodeAPI.code}&searchtext=${encodedAddress}`;

axios.get(geocodeUrl)
.then ((response) => {

    if (response.data.Response.View.length === 0) {
        throw new Error('Unable to find that address');
    }
    const latitude = response.data.Response.View[0].Result[0].Location.DisplayPosition.Latitude;
    const longitude = response.data.Response.View[0].Result[0].Location.DisplayPosition.Longitude;

    console.log(response.data.Response.View[0].Result[0].Location.Address.Label);

    
    const weatherAPIkey = '4e8229877c9c92725592cd4d09dc55c8';
    const weatherUrl = `https://api.darksky.net/forecast/${weatherAPIkey}/${latitude},${longitude}`;

    return axios.get(weatherUrl);
})
.then ((response) => {

    const temperature = farenheitToCelcius(response.data.currently.temperature);
    const feelsLikeTemp = farenheitToCelcius(response.data.currently.apparentTemperature);

    console.log('Temperature:', temperature);
    console.log('Feels like:', feelsLikeTemp);
})
.catch ((error) => {
    if (error.code === 'ENOTFOUND') {
        console.log('Unable to connect to API servers');
    } else if (error.response.status === 400) {
        console.log('Unable to find that address');
    } else {
        console.log(error.message);
        debugger;
    }
});

const farenheitToCelcius = farenheit => ((farenheit - 32) * 5 / 9).toFixed(2);