const { weather } = require("./weatherbit");
const { cityImg } = require("./unsplash");

const weatherRender = (location, res) => {
  weather(location, (error, body) => {
    if (error) {
      console.log(error);
    } else {
      cityImg(location, (error, { bgURL }) => {
        if (error) {
          console.log(error);
        } else {
          return res.render("index", {
            location,
            description: body.description,
            temperature: body.temperature,
            localTime: body.localTime,
            icon: body.icon,
            bgURL,
            windSpeed: body.windSpeed,
            windDirection: body.windDirection,
            countryCode: body.countryCode,
            pressure: body.pressure,
            uvIndex: body.uvIndex,
            precip: body.precip,
          });
        }
      });
    }
  });
};

module.exports.weatherRender = weatherRender;
