const axios = require("axios");
/* const fetch = require("node-fetch"); */
require("dotenv").config();

const key = process.env.WEATHERBIT_API_KEY;

//weather current day
const currentWeather = async (city) => {
  const url = `https://api.weatherbit.io/v2.0/current?city=${city}&key=${key}`;

  try {
    let response = await axios.get(url);
    let forecast = response.data.data[0];

    const icon =
      "https://www.weatherbit.io/static/img/icons/" +
      forecast.weather.icon +
      ".png";

    const weatherForecast = {
      location: city,
      description: forecast.weather.description,
      temperature: Math.round(forecast.temp),
      icon,
      windSpeed: Math.round(forecast.wind_spd),
      windDirection: forecast.wind_cdir_full,
      countryCode: forecast.country_code,
      pressure: Math.round(forecast.pres),
      uvIndex: Math.round(forecast.uv),
      precip: Math.round(forecast.precip),
      sunrise: forecast.sunrise,
      sunset: forecast.sunset
    };

    return weatherForecast;
  } catch (e) {
    console.log(e);
  }
};

// Daily weather
const dailyWeather = async (city) => {
  const url =
    "https://api.weatherbit.io/v2.0/forecast/daily?city=" +
    city +
    "&key=" +
    key;

  try {
    let response = await axios.get(url);
    let json = response.data.data;

    const weatherForecast = json.slice(1, 6).map((item) => {
      return {
        date: item.valid_date,
        icon: `https://www.weatherbit.io/static/img/icons/${item.weather.icon}.png`,
        temperature: Math.round(item.temp)
      };
    });

    return weatherForecast;
  } catch (e) {
    console.log(e);
  }
};

const weather = async (city) => {
  const meteo = {
    current: await currentWeather(city),
    daily: await dailyWeather(city)
  };

  return meteo;
};

module.exports.weather = weather;