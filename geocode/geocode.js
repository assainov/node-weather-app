const request = require('request');

const api = {
    id: 'i6OKM9fx7ip6OlXxXuTd',
    code: 'tZFf2f6d-D0N6neIPN0OIg'
};

const geocodeAddress = (address, callback) => {

    let encodedAddress = encodeURIComponent(address);
    request({
        url: `https://geocoder.api.here.com/6.2/geocode.json?app_id=${api.id}&app_code=${api.code}&searchtext=${encodedAddress}`,
        json: true
    }, (error, response, body) => {
        if (error) {
            callback('Unable to connect to the server', undefined);
        } else if (body.Response.View.length === 0) {
            callback('Unable to find that address', undefined);
        } else {
            callback(undefined, {
                address: body.Response.View[0].Result[0].Location.Address.Label,
                lat: body.Response.View[0].Result[0].Location.DisplayPosition.Latitude,
                long: body.Response.View[0].Result[0].Location.DisplayPosition.Longitude
            });
        }
    });
}

module.exports = {
    geocodeAddress
}