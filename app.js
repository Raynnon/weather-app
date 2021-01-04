const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode.js");

const location = process.argv[2];

if (!location) {
  console.log("Please enter a location");
} else {
  geocode(location, (error, data) => {
    if (error) {
      console.log("Error", error);
    } else {
      let latitude = data.latitude;
      let longitude = data.longitude;

      forecast(latitude, longitude, (error, data) => {
        if (error) {
          console.log("ERROR =>", error);
        } else {
          console.log("DATA =>", data);
        }
      });
    }
  });
}
