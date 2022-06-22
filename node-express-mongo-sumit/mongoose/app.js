const express = require('express');
const mongoose = require('mongoose');

const app = express();

const todoRoutes = require('./routes/todoRoutes')

app.use(express.json());

//database connection
mongoose.connect('mongodb://localhost/todos', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('connection success'))
.catch(err => console.log(err))

//api endpoint for todos
app.use('/todos', todoRoutes);


//error handlers
function errorHandler(err, req, res, next){
    if(res.headersSent){
        return next(err);
    }
    res.status(500).json({message: err.message});
}

app.listen(3000)