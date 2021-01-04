const request = require("postman-request");

const geocode = (address, callback) => {
  const token =
    "pk.eyJ1IjoicmF5bm5vbiIsImEiOiJja2poNjJlaGk5OGtzMzJxamZvcDc0YjlqIn0.hCLzjRbHxOusk3DGFATO_A";
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=" +
    token;

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to location services!", undefined);
    } else if (response.body.features.length === 0) {
      callback("Unable to find location. Try another search", undefined);
    } else {
      callback(undefined, {
        longitude: response.body.features[0].center[0],
        latitude: response.body.features[0].center[1],
        location: response.body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
