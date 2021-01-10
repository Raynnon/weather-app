const express = require("express");
const ejs = require("ejs");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "./public")));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index", {
    location: "Barcelona",
    weather: "Rainy",
    temperature: "7",
  });
});

app.post("/search", (req, res) => {
  const location = req.body.location;
  res.render("index", { location: location });
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
