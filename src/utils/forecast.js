const request = require('request');



const forecast = (latitude, longitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=621ed59e7b040c7ef5292d077b104369&query=' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude);

    request({ url, json: true }, (error, {body}={}) => {
        if (error) {
            callback("Unable to connect to weather service",undefined);
        }
        else if (body.error) {
            callback('Unable to find location',undefined);
        }

        else {
            callback(undefined,body.current.weather_descriptions[0] + ". It is currently " + body.current.temperature + " degrees,it feels like " + body.current.feelslike + " degrees out");
        }
    })

}

module.exports=forecast;