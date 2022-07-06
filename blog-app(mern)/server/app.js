const express = require('express');
const { default: mongoose } = require('mongoose');
const port = process.env.PORT || 8080;
const cors = require('cors');
const books = require('./routes/books')
const app = express();

mongoose.connect("mongodb://localhost:27017/blog-app", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  autoIndex: true,
});
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));


app.use('/api', books);

app.listen(port, ()=>{
    console.log('listening on port ' + port)
})