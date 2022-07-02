const express = require('express');
const path = require('path');
const hbs = require('hbs')

const app = express();
const port = 3000;

// app.use(express.static(path.join(__dirname, '../public')));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../template/views'))
hbs.registerPartials(path.join(__dirname, '../template/partials'))

app.get('/', (req, res) => {
    res.render('index', {
        title: 'weather app',
        name: 'jack'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title:'about',
        text: 'Welcome to about page'
    })
})

app.listen(port, ()=>{
    console.log('listening to port '+port);
});