const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

var geoip = require("geoip-lite");

const { weatherRender } = require("./controllers/weatherRender");

const app = express();

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "./public")));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  const ip = "47.61.63.17"; //req.headers["x-forwarded-for"] || req.connection.remoteAddress
  const geo = geoip.lookup(ip);
  const location = geo.city;

  weatherRender(location, res);
});

app.post("/search", (req, res) => {
  let location = req.body.location;

  if (!location) {
    const ip = "47.61.63.17"; //req.headers["x-forwarded-for"] || req.connection.remoteAddress
    const geo = geoip.lookup(ip);
    location = geo.city;
  }
  weatherRender(location, res);
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
