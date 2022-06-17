const http = require("http");

const express = require("express");
const app = express();
const bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({ extended: false }))


app.use('/add-product', (req, res, next) => {
  res.send('<form action="/product" method="POST"><input type="text" name="titile"></input><button type="submit" >add</button></form>')
})

app.use('/product', (req, res, next) => {
  console.log(req.body)
  res.redirect('/')
})

app.use((req, res, next) => {
  res.send('hello world')
})

// const requestHandler = require("./routes")
// const server = http.createServer(requestHandler);

app.listen(3000)
