
const yargs = require('yargs');

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

const argv = yargs
            .options({
                a: {
                    demand: true,
                    alias: 'address',
                    describe: 'Address to fetch weather for',
                    string: true
                }
            })
            .help()
            .alias('help', 'h')
            .argv;

geocode.geocodeAddress(argv.address, (errorMessage, results) =>{
    if(errorMessage) {
        console.log('Error:', errorMessage);
    }
    else {
        console.log('Address:', results.address);
        debugger;
        
        weather.getWeather(results.lat, results.long, (errorMessage, result) => {
            if (errorMessage) {
                console.log(errorMessage);
            } else {
                console.log('Temperature in celcius:', result.temperature);
                console.log('Feels like:', result.feelsLikeTemp);
            }
        });
        
        
    }
});

