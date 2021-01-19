const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

var geoip = require("geoip-lite");

//const { weatherRender } = require("./controllers/weatherRender");
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

  const rendering = async () => {
    const forecast = await weather(location);
    const current = forecast.current;
    const daily = forecast.daily;
    const background = await cityImg(location);

    res.render("index", { current, daily, background });
  };

  rendering();
});

app.post("/search", (req, res) => {
  let location = req.body.location;

  if (!location) {
    const ip = "47.61.63.17"; //req.headers["x-forwarded-for"] || req.connection.remoteAddress
    const geo = geoip.lookup(ip);
    location = geo.city;
  }

  const rendering = async () => {
    const forecast = await weather(location);
    const current = forecast.current;
    const daily = forecast.daily;
    const background = await cityImg(location);

    res.render("index", { current, daily, background });
  };

  rendering();
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
