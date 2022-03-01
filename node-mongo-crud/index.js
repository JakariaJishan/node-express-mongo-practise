const express = require("express");
const app = express();
const uri =
  "mongodb+srv://organicUser:KJqSfOOLzRSWltcf@cluster0.sh1am.mongodb.net/organicdb?retryWrites=true&w=majority";
var bodyParser = require("body-parser");

const { MongoClient, ServerApiVersion } = require("mongodb");
const ObjectId = require("mongodb").ObjectId;
const res = require("express/lib/response");

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

//password: KJqSfOOLzRSWltcf

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

client.connect((err) => {
  const collection = client.db("mongodb").collection("products");
  app.get("/products", (req, res) => {
    collection.find({}).toArray((err, data) => {
      res.send(data);
    });
  });

  app.get("/singleProduct?/:id", (req, res) => {
    collection
      .find({ _id: ObjectId(req.params.id) })
      .toArray((err, documents) => {
        res.send(documents[0])
      });
  });

  app.post("/addProducts", (req, res) => {
    const pd = req.body;
    collection.insertOne(pd).then((result) => {
      console.log("success");
      res.redirect('/')
    });
  });

  app.patch('/update/:id', (req,res) => {
    console.log(req.body.id);
    collection.updateOne({ _id: ObjectId(req.params.id) },{
      $set:{price: req.body.price, quantity: req.body.quantity}
    })
    .then(result => console.log(result))
  })

  app.delete("/deleteItem/:id", (req, res) => {
    collection
      .deleteOne({
        _id: ObjectId(req.params.id),
      })
      .then((res2) => {
        res.send('sdf')
      });
  });
});

app.listen(4000);
