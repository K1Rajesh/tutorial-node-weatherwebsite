const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url= 'http://api.weatherstack.com/current?access_key=3377ef16b939363c3442714b85278b7a'
    +'&query=' + latitude +',' + longitude +'&units=f' // 37.8267 +',' + -122.4233      

    request({ url, json: true }, (error, { body }={}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            //console.log(body)
            callback(undefined, 'It is currently ' + body.current.temperature + ' degress out. There is a ' 
            + body.current.precip + '% chance of rain.')
        }
    })
}

module.exports = forecast