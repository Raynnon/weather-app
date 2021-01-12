const request = require("postman-request");

const weather = (city, callback) => {
  let location = "Barcelona";

  if (city) {
    location = city;
  }

  const key = "6e2354a3a7d14505bb1fc4f405c87e61";
  const url =
    "https://api.weatherbit.io/v2.0/current?city=" + location + "&key=" + key;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (!body) {
      callback("Please choose an existing city", undefined);
    } else {
      const icon =
        "https://www.weatherbit.io/static/img/icons/" +
        body.data[0].weather.icon +
        ".png";

      callback(undefined, {
        description: body.data[0].weather.description,
        temperature: Math.round(body.data[0].temp),
        icon,
        localTime: body.data[0].datetime,
      });
    }
  });
};

module.exports.weather = weather;
