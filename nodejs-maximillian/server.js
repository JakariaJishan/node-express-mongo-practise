const http = require("http");
const path = require("path");
const adminRouter = require("./routes/admin");

const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')))


app.use("/admin", adminRouter);

app.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "views", "shop.html"));
});

app.use((req, res, next) => {
  res.status(404).sendfile(path.join(__dirname, "views", "404.html"))
});
// const requestHandler = require("./routes")
// const server = http.createServer(requestHandler);

app.listen(3000);
