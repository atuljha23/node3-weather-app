const request = require('postman-request');


const forecast = (lat, long, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=7c74a1e634b47d2de1a53b69144d0b1b&query=${lat},${long}`
    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to reach weatherstack API, check internet connection', undefined)
        }
        else if (body.error) {
            callback(`Error!!! ${body.error.info}`)
        }
        else {
            callback(undefined, `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature}° Celcius, although it feels like ${body.current.feelslike}° Celcius`)
        }
    })
}





module.exports = forecast
