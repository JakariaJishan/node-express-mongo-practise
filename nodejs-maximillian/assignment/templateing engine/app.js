const express = require("express");

const app = express();
const port = 3000;

const bodyParser = require("body-parser");
const { getUser, addUser, userHome } = require("./controller/user.controller");
const userRoute = require("./routes/router");
app.use(bodyParser.urlencoded({ extended: false }))



app.set('view engine', 'ejs');

app.use('/', userRoute)
// app.use('/user', userRoute)
// app.use('/add', userRoute)



app.listen(port);
