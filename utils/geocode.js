const request = require('request')

const geocode = (address, callback) => {
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'
    + encodeURIComponent(address) //special charectars in string formatted to URI formatting
    +'.json?access_token=pk.eyJ1IjoiYmlsdCIsImEiOiJja3E5bHdtMDEwZGlwMm5sYjR4MWN6YndrIn0.7sNXBVY06u_GSiwIGBGnTA&limit=1'
    
    request({ url, json: true }, (error, { body }={}) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode