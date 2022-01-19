const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
require("dotenv").config();

var geoip = require("geoip-lite");
const requestIp = require("request-ip");

const { weather } = require("./controllers/weatherbit");
const { cityImg } = require("./controllers/unsplash");

const app = express();

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "./public")));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  let ip = requestIp.getClientIp(req);
  const location = geoip.lookup(ip) ? geoip.lookup(ip).city : "";

  const forecast = await weather(location);
  const current = forecast.current;
  const daily = forecast.daily;
  const background = await cityImg(location);

  res.render("index", { current, daily, background });
});

app.post("/search", async (req, res) => {
  let location = req.body.location || "";
  const background = (await cityImg(location)) || "./img/cloudy.jpg";
  let current;
  let daily;

  if (location) {
    const forecast = await weather(location);
    current = forecast.current;
    daily = forecast.daily;
  }

  res.render("index", { current, daily, background });
});

app.use((req, res, next) => {
  res.status(404).render("404");
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log("Server listening on port", port);
});
