const request = require("postman-request");

//MAPBOX //
const mapBoxToken =
  "pk.eyJ1IjoicmF5bm5vbiIsImEiOiJja2poNjJlaGk5OGtzMzJxamZvcDc0YjlqIn0.hCLzjRbHxOusk3DGFATO_A";
const mapBoxURL =
  "https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=" +
  mapBoxToken +
  "&limit=1";

request({ url: mapBoxURL, json: true }, (error, response, body) => {
  try {
    const longitude = body.features[0].center[0];
    const latitude = body.features[0].center[1];

    console.log("Longitude:", longitude);
    console.log("Latitude:", latitude);
  } catch (e) {
    console.log("MapBoxAPI error =>" + e);
  }
});

// WEATHER //
const weatherToken = "f8e4030b4dbf1ce90560735e05da7698";
const city = "Barcelona";
const weatherURL =
  "http://api.weatherstack.com/current?access_key=" +
  weatherToken +
  "&query=" +
  city +
  "&units=m";

request({ url: weatherURL, json: true }, (error, response, body) => {
  try {
    console.log(body.location.name, "-", body.location.country);
    console.log("Weather:", body.current.weather_descriptions[0]);
    console.log("Temperature", body.current.temperature);
    console.log("Rain probability:", body.current.precip);
  } catch (e) {
    console.log("Weather API error => " + e);
  }
});
