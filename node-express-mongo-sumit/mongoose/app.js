const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();

const todoRoutes = require("./routes/todoRoutes");
const userHandler = require("./routes/userHandler");

app.use(express.json());
dotenv.config();

//database connection
mongoose
  .connect("mongodb://localhost/todos", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connection success"))
  .catch((err) => console.log(err));

//api endpoint for todos
app.use("/todos", todoRoutes);
app.use("/user", userHandler);

//error handlers
function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).json({ message: err });
}
app.use(errorHandler);
app.listen(3000);
