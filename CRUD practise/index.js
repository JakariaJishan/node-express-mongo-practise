const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const res = require("express/lib/response");

//pass: 143vdhftHqAQiFhr
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const ObjectId = require("mongodb").ObjectId;

const uri =
  "mongodb+srv://CRUD-practise:143vdhftHqAQiFhr@cluster0.7e5ei.mongodb.net/quotedb?retryWrites=true&w=majority";

// const { MongoClient, ServerApiVersion } = require("mongodb");

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

MongoClient.connect(uri, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
}).then((client) => {
  const db = client.db("funny-quotes");
  const quoteCollection = db.collection("quotes");

  app.post("/quotes", (req, res) => {
    quoteCollection.insertOne(req.body)
    .then(result=> {
      res.redirect('/')
    })
  });

  app.get("/x", (req,res)=>{
    quoteCollection.find({}).toArray()
    .then(result => {
      res.send(result)
    })
  })

  app.get('/update/:id', (req,res) => {
    console.log(req.params.id);
    quoteCollection.find({_id: ObjectId(req.params.id)}).toArray()
    .then(result => {
      res.send(result)
    })
  })

  app.patch('/updateItem/:id', (req, res) =>{
    quoteCollection.updateOne({_id: ObjectId(req.params.id)},{
      $set:{
        name: req.body.name,
        quote: req.body.quote
      }
    })
    .then(result => {
      console.log(result)
    })
  })

  app.delete('/delete/:id', (req, res) =>{
    quoteCollection.deleteOne({_id: ObjectId(req.params.id)})
    .then(result => {
      res.send('success')
    })
  })

});



app.listen(3000, (req, res) => {
  console.log("listening to 3000");
});
