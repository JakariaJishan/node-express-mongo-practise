const http = require("http");
const path = require("path");
const adminRouter = require("./routes/admin");

const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')))

app.set('view engine', 'ejs');

app.use("/admin", adminRouter.router);

app.get("/", (req, res, next) => {
  const prod = adminRouter.products;
  res.render('shop', {
    prod,
    shopTitle : 'shop page'
  })
});

app.use((req, res, next) => {
  res.status(404).render('404', {title: 'error page'})
});
// const requestHandler = require("./routes")
// const server = http.createServer(requestHandler);

app.listen(3000);
