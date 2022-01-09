const request = require('request');

const geocode = (address, callback) => {
  const geoUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoic2h5YW1taHQiLCJhIjoiY2t1MnNmbGExMTRzZTJ4cDcybGI1bWY2eCJ9.ZDk2b4hWSPrWStQ-mkL36Q&limit=1`;
  request({ url: geoUrl, json: true }, (error, response) => {
    if (error) {
      callback('unable to connect location services!',undefined)
    } else if (response.body.features.length === 0) {
      callback('unable to find location, try another search!',undefined)
    } else {
      const location = response.body.features[0].place_name;
      const [longitude,latitude ] = response.body.features[0].center;
      callback(undefined,{location,latitude,longitude})
    }
  })
}

module.exports = geocode;