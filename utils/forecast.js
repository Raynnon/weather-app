const request = require("postman-request");

const forecast = (longitude, latitude, callback) => {
  const token = "f8e4030b4dbf1ce90560735e05da7698";
  const url =
    "http://api.weatherstack.com/current?access_key=" +
    token +
    "&query=" +
    longitude +
    "," +
    latitude +
    "&units=m";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(undefined, {
        location: body.location.name + "-" + body.location.country,
        weather: body.current.weather_descriptions[0],
        temperature: body.current.temperature,
        rainProbability: body.current.precip,
      });
    }
  });
};

module.exports = forecast;
