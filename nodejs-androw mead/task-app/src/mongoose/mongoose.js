const mongoose = require("mongoose");
const validator = require("validator");

mongoose.connect("mongodb://localhost:27017/task-app", {
  useNewUrlParser: true,
});

const User = mongoose.model("User", {
  name: {
    type: String,
    require: true,
    trim: true,
  },
  age: {
    type: Number,
    default: 18,
    validate(value) {
      if (value < 0) {
        throw new Error("age must be an integer");
      }
    },
  },
  email: {
    type: String,
    lowercase: true,
    required: true,
    trim: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("email must be a valid email");
      }
    },
  },
  password: {
    type: String,
    trim: true,
    required: true,
    minLength: 6,
    validate(value) {
      if (value.includes("password")) {
        throw new Error("invalid password");
      }
    },
  },
});

const userData = new User({
  name: "jack ",
  email: "jack@gmail.com",
  password: "ja2asdf3",
});

// userData.save().then(()=> {
//     console.log('data inserted successfully')
// }).catch(err => {
//     console.log(err);
// })

const Task = mongoose.model("Task", {
  description: {
    type: String,
    required: true,
    trim: true,
  },
  completedTask: {
    type: Boolean,
    default: false,
  },
});

const taskApp = new Task({
  description: "my thired task",
});

// taskApp
//   .save()
//   .then(() => {
//     console.log("task inserted");
//   })
//   .catch((err) => {
//     console.log("error", err);
//   });
