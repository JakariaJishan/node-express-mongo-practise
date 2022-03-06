const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});


const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://crud-react:crud-react.js@cluster0.7e5ei.mongodb.net/crud-react?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
client.connect((err) => {
  const collection = client.db("crud-react").collection("crud-react-collection");
  app.post("/addLocalData", (req, res) => {
      const newData = req.body;
      collection.insertOne(newData)
      .then(result => {
          res.send(result.insertedCount> 0)
      })
  });

  app.get('/data', (req, res) =>{
    console.log(req.query)
      collection.find().toArray()
      .then(result =>{
          res.send(result)
      })
  })
  
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
