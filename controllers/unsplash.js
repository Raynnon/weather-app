const request = require("postman-request");

const cityImg = (city, callback) => {
  const key = "3O7w55JwDJSzQSiKKMRiElZ0GjEATt7P4A5h2cRYOBc";
  const url =
    "https://api.unsplash.com/search/photos?page=1&query=" +
    city +
    "&orientation=landscape&client_id=" +
    key;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback(error, undefined);
    } else if (!body.results[0]) {
      callback(undefined, { bgURL: "../img/cloudy.jpg" });
    } else {
      callback(undefined, { bgURL: body.results[0].urls.raw });
    }
  });
};

module.exports.cityImg = cityImg;
