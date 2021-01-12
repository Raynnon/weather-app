const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const ejs = require("ejs");
var geoip = require("geoip-lite");

const { weather } = require("./controllers/weatherbit");
const { cityImg } = require("./controllers/unsplash");

const app = express();

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "./public")));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  const ip = "47.61.63.17"; //req.headers["x-forwarded-for"] || req.connection.remoteAddress
  const geo = geoip.lookup(ip);
  const location = geo.city;

  weather(
    location,
    (error, { description, temperature, icon, localTime, bgURL } = {}) => {
      if (error) {
        console.log(error);
      } else {
        cityImg(location, (error, { bgURL }) => {
          if (error) {
            console.log(error);
          } else {
            res.render("index", {
              location,
              description,
              temperature,
              localTime,
              icon,
              bgURL,
            });
          }
        });
      }
    }
  );
});

app.post("/search", (req, res) => {
  let location = req.body.location;

  if (!location) {
    const ip = "47.61.63.17"; //req.headers["x-forwarded-for"] || req.connection.remoteAddress
    const geo = geoip.lookup(ip);
    location = geo.city;
  }

  weather(
    location,
    (error, { description, temperature, icon, localTime, bgURL } = {}) => {
      if (error) {
        console.log(error);
      } else {
        cityImg(location, (error, { bgURL }) => {
          if (error) {
            console.log(error);
          } else {
            res.render("index", {
              location,
              description,
              temperature,
              localTime,
              icon,
              bgURL,
            });
          }
        });
      }
    }
  );
});

app.get("/help", (req, res) => {
  res.render("help");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/weather", (req, res) => {
  res.send({
    city: "Barcelona",
    weather: "rainy",
    temperature: 7,
  });
});

const port = 3000;
app.listen(port, () => {
  console.log("Server listening on port", port);
});

// https://api.teleport.org/api/urban_areas/slug:barcelona/images/
