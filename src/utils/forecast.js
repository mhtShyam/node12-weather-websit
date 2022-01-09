const request = require('request');

const forecast = (latitude,longitude, callback) => {
  //console.log(latitude, longitude)
  const weatherUrl = `http://api.weatherstack.com/current?access_key=f578cfa45d48e591cffdf76652cc04b2&query=${encodeURIComponent(latitude)},${encodeURIComponent(longitude)}&unit=m`;
  request({ url: weatherUrl, json: true }, (error, response) => {
    if (error) {
      callback('unable to connect weather services.', undefined);
    } else if (response.body.error) {
      callback('unable to find location.',undefined)
    } else {
      callback(undefined, `It is currently ${response.body.current.temperature} degrees out. There is chance of ${response.body.current.weather_descriptions}.`);
    }
  })
}

module.exports = forecast;