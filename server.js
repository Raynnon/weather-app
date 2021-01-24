const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

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

  if (ip === "::1") {
    ip = "37.223.93.222";
  }

  const geo = geoip.lookup(ip);
  const location = geo.city;
  const forecast = await weather(location);
  const current = forecast.current;
  const daily = forecast.daily;
  const background = await cityImg(location);

  res.render("index", { current, daily, background });
});

app.post("/search", async (req, res) => {
  let location = req.body.location;

  if (!location) {
    let ip = requestIp.getClientIp(req);

    if (ip === "::1") {
      ip = "37.223.93.222";
    }

    const geo = geoip.lookup(ip);
    location = geo.city;
  }

  const forecast = await weather(location);
  const current = forecast.current;
  const daily = forecast.daily;
  const background = await cityImg(location);

  res.render("index", { current, daily, background });
});

app.use((req, res, next) => {
  res.status(404).render("404");
});

const port = 3000;
app.listen(port, () => {
  console.log("Server listening on port", port);
});
