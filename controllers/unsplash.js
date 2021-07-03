const fetch = require("node-fetch");
require("dotenv").config();

const cityImg = async (city) => {
  const key = process.env.UNSPLASH_API_KEY;
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
      //Unsplash image compression
      const options = "&w=1920&auto=format";

      return json.results[0].urls.raw + options;
    }
  } catch (e) {
    console.log(e);
  }
};

module.exports.cityImg = cityImg;
