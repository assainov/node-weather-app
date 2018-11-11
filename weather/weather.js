const request = require('request');

const weatherAPIkey = '4e8229877c9c92725592cd4d09dc55c8';

const getWeather = (latitude, longitude, callback) => {
    request({
        url : `https://api.darksky.net/forecast/${weatherAPIkey}/${latitude},${longitude}`,
        json: true
    }, (error, response, body) => {
        if (error) {
            callback('Unable to connect to the weather server');
        } else if (body.code === 400) {
            callback('Unable to fetch the response');
        } else {
            const temperature = farenheitToCelcius(body.currently.temperature);
            const feelsLikeTemp = farenheitToCelcius(body.currently.apparentTemperature);

            callback(undefined, {
                temperature,
                feelsLikeTemp
            });
        }
    });
};

const farenheitToCelcius = farenheit => ((farenheit - 32) * 5 / 9).toFixed(2);


module.exports = {
    getWeather
};