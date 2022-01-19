const axios = require("axios");
require("dotenv").config();

const cityImg = async (city) => {
  const key = process.env.UNSPLASH_API_KEY;
  const url =
    "https://api.unsplash.com/search/photos?page=1&per_page=1&orientation=landscape&query=" +
    city +
    "&client_id=" +
    key;

  try {
    let response = await axios.get(url);
    let image = response.data.results[0].urls.regular;

    if (!image) {
      return "../img/cloudy.jpg";
    } else {
      return image;
    }
  } catch (e) {
    console.log(e);
  }
};

module.exports.cityImg = cityImg;
