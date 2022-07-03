const express = require("express");
const mongoose = require("mongoose");

const Task = require("./model/task");
const User = require("./model/user");
const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());

mongoose.connect("mongodb://localhost:27017/task-app", {
  useNewUrlParser: true,
});


app.post("/user", (req, res) => {
  const user = new User(req.body);
  user
    .save()
    .then(() => res.status(200).send(user))
    .catch((err) => res.status(500).send(err.message));
});

app.post("/tasks", (req, res) => {
  const tasks = new Task(req.body);
  tasks
    .save()
    .then(() => res.status(200).send(tasks))
    .catch((err) => res.status(500).send(err.message));
});

app.get('/users', (req, res) => {
    User.find({}).then(result => {
        res.status(200).send(result)
    }).catch(error=> {
        res.status(500).send(error.message)
    })
})
app.get('/tasks', (req, res) => {
    Task.find({}).then(result => {
        res.status(200).send(result)
    }).catch(error=> {
        res.status(500).send(error.message)
    })
})
app.get('/tasks/:id', (req, res) => {
    const _id = req.params.id
    Task.findById(_id).then(result => {
        if(!result){
            return res.status(500).send('faild')
        }
        res.status(200).send(result)
    }).catch(error=> {
        res.status(500).send(error.message)
    })
})




app.listen(port, () => {
  console.log("listening to port: " + port);
});
