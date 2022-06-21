const express = require("express");
const publicRoute = express.Router();


// publicRoute.param('user', (req, res, next, id) => {
//     req.user = id === "1"? 'admin' : "public";
//     next();
// })


//function into another function
publicRoute.param((options, value) => (req, res, next, id) => {
  if (id === value) {
    req.user = "public";
    next();
  } else {
    res.sendStatus(403);
  }
});

publicRoute.param("user", "10");

publicRoute.get("/:user", (req, res) => {
  res.send(`hello ${req.user}`);
});

publicRoute.get("/public", (req, res) => {
  res.send("the public route");
});

module.exports = publicRoute;
