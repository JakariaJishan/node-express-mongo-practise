const express = require("express");
const path = require("path");
const hbs = require("hbs");
const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");

const app = express();
const port = 3000;

// app.use(express.static(path.join(__dirname, '../public')));
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "../template/views"));
hbs.registerPartials(path.join(__dirname, "../template/partials"));

app.get("/", (req, res) => {
  res.render("index", {
    title: "weather app",
    name: "jack",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "about",
    text: "Welcome to about page",
  });
});

app.get("/weather", (req, res) => {
  const location = req.query.location;
  if (!location) {
    return res.send({
      error: " no location specified",
    });
  }

  geocode(location, (err, data) => {
    if (err) {
      return res.send({ 
        error: 'invalid location',
      })
    }
    forecast(data.longitude, data.latitude, (error, data) => {
      if (error) {
        return console.log(error);
      }
      res.send({
        forecast: data.weather[0].description,
        location: data.name,
      });
    });
  });
});

app.listen(port, () => {
  console.log("listening to port " + port);
});
