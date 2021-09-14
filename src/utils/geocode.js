const request = require('postman-request');
const geocode = (address, callback) => {
    url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiaWFtYXR1bGpoYSIsImEiOiJja3RpbGo4a2ExMzJhMnltcmtwa3JoNjh6In0.j-_B0F9Rj4sBlyqHk8gXFQ&limit=1`;
    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback(`Unable to connect to location services!`, undefined);
        }
        else if (body.features.length === 0) {
            callback('No Result found for given search term, please try again', undefined)
        }
        else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                placename: body.features[0].place_name
            })

        }
    })
}



module.exports = geocode