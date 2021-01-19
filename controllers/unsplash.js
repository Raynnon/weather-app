const fetch = require("node-fetch");

const cityImg = async (city) => {
  const key = "3O7w55JwDJSzQSiKKMRiElZ0GjEATt7P4A5h2cRYOBc";
  const url =
    "https://api.unsplash.com/search/photos?page=1&query=" +
    city +
    "&orientation=landscape&client_id=" +
    key;

  try {
    let response = await fetch(url);
    let json = await response.json();

    if (!json.results[0]) {
      return "../img/cloudy.jpg";
    } else {
      return json.results[0].urls.raw;
    }
  } catch (e) {
    console.log(e);
  }
};

module.exports.cityImg = cityImg;
