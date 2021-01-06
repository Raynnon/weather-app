const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode.js");

const address = process.argv[2];

if (!address) {
  console.log("Please provide an address");
} else {
  geocode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      console.log("Error", error);
    } else {
      forecast(
        latitude,
        longitude,
        (error, { weather, temperature, rainProbability } = {}) => {
          if (error) {
            console.log("ERROR =>", error);
          } else {
            console.log(location);
            console.log("Weather:", weather);
            console.log("Temperature:", temperature);
            console.log("Rain probability:", rainProbability);
          }
        }
      );
    }
  });
}
