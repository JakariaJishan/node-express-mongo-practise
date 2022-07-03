const { default: mongoose } = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
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

const User = mongoose.model("User", userSchema);

module.exports = User;
