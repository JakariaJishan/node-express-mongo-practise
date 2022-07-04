const express = require("express");
const mongoose = require("mongoose");

const userRoute = require("./routes/user");
const taskRoute = require("./routes/task");

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());

app.use(userRoute);
app.use(taskRoute);

mongoose.connect("mongodb://localhost:27017/task-app", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  autoIndex: true,
});

app.listen(port, () => {
  console.log("listening to port: " + port);
});
