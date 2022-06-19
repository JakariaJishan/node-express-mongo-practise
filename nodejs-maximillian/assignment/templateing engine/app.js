const express = require("express");

const app = express();
const port = 3000;

const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({ extended: false }))


const user=[];

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index', {title: 'home'})
})

app.get('/user', (req, res) => {
    
    res.render('user', {title: 'user', user})
})

app.post('/add-user', (req, res) => {
    user.push({user: req.body.username})
    res.redirect('/user')
})

app.listen(port);
