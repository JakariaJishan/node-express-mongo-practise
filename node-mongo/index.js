const express = require("express");
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors());

app.use(bodyParser.json())


let port = 1000;
const fruit = [
  {
    name: "banana",
    price: 234,
  },
  {
    name: "apple",
    price: 3,
  },
  {
    name: "orange",
    price: 5,
  },
  {
    name: "multa",
    price: 345,
  },
];
// app.get("/", (req, res) => {
//   res.send(fruit);
// });
// app.get("/shop/:id", (req, res) => {
//   console.log(req.params);
//   res.send(fruit[req.params.id]);
// });

app.post('/add', (req, res) => {
  const user = req.body;
  user.id = 33
  res.send(user);
})

app.listen(port, () => console.log("listening port" + port));
