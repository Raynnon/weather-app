const fetch = require("node-fetch");

let location = "";
const key = "6e2354a3a7d14505bb1fc4f405c87e61";

//weather current day
const currentWeather = async (city) => {
  if (city) {
    location = city;
  }

  const url =
    "https://api.weatherbit.io/v2.0/current?city=" + location + "&key=" + key;

  try {
    let response = await fetch(url);
    let json = await response.json();

    if (response.status === 204) {
      return Error("Please choose an existing city");
    } else {
      const icon =
        "https://www.weatherbit.io/static/img/icons/" +
        json.data[0].weather.icon +
        ".png";

      const weatherForecast = {
        description: json.data[0].weather.description,
        temperature: Math.round(json.data[0].temp),
        icon,
        windSpeed: Math.round(json.data[0].wind_spd),
        windDirection: json.data[0].wind_cdir_full,
        countryCode: json.data[0].country_code,
        pressure: Math.round(json.data[0].pres),
        uvIndex: Math.round(json.data[0].uv),
        precip: Math.round(json.data[0].precip),
        sunrise: json.data[0].sunrise,
        sunset: json.data[0].sunset,
      };

      return weatherForecast;
    }
  } catch (e) {
    console.log(e);
    return Error("Unable to connect to weather service!");
  }
};

// Daily weather
const dailyWeather = async (city) => {
  if (city) {
    location = city;
  }

  const url =
    "https://api.weatherbit.io/v2.0/forecast/daily?city=" +
    location +
    "&key=" +
    key;

  try {
    let response = await fetch(url);
    let json = await response.json();

    if (response.status === 204) {
      return Error("Please choose an existing city");
    } else {
      const iconURL = "https://www.weatherbit.io/static/img/icons/";

      const weatherForecast = {
        today: {
          date: json.data[0].valid_date,
          location,
        },
      };

      for (let i = 1; i <= 6; i++) {
        const weatherKey = "D" + i;

        weatherForecast[weatherKey] = {
          date: json.data[i].valid_date,
          icon: iconURL + json.data[i].weather.icon + ".png",
          temperature: Math.round(json.data[i].temp),
        };
      }

      return weatherForecast;
    }
  } catch (e) {
    console.log(e);
    return Error("Unable to connect to weather service!");
  }
};

const weather = async (city) => {
  const meteo = {
    current: await currentWeather(city),
    daily: await dailyWeather(city),
  };

  return meteo;
};

module.exports.weather = weather;
