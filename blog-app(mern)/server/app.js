const express = require("express");
const { default: mongoose } = require("mongoose");
const port = process.env.PORT || 5000;
const cors = require("cors");
const books = require("./routes/books");
const users = require("./routes/users");
const auth = require("./middlewares/auth");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const app = express();

mongoose.connect("mongodb://localhost:27017/blog-app", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  autoIndex: true,
});
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }))

app.use(cors({ origin: true, credentials: true }));

app.use("/api", books);
app.use("/register", users);

app.listen(port, () => {
  console.log("listening on port " + port);
});
