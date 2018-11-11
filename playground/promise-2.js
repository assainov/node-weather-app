const request = require('request');

const api = {
    id: 'i6OKM9fx7ip6OlXxXuTd',
    code: 'tZFf2f6d-D0N6neIPN0OIg'
};

const geocodeAddress = (address) => {
    let encodedAddress = encodeURIComponent(address);

    return new Promise((resolve, reject) => {
        request({
            url: `https://geocoder.api.here.com/6.2/geocode.json?app_id=${api.id}&app_code=${api.code}&searchtext=${encodedAddress}`,
            json: true
        }, (error, response, body) => {
            if (error) {
                reject('Unable to connect to the server');
            } else if (body.Response.View.length === 0) {
                reject('Unable to find that address');
            } else {
                resolve({
                    address: body.Response.View[0].Result[0].Location.Address.Label,
                    lat: body.Response.View[0].Result[0].Location.DisplayPosition.Latitude,
                    long: body.Response.View[0].Result[0].Location.DisplayPosition.Longitude
                });
            }
        });
    });
};


geocodeAddress('0000')
.then((location) => {
    console.log(JSON.stringify(location, undefined, 2));
})
.catch((errorMessage) => {
    console.log(errorMessage);
});