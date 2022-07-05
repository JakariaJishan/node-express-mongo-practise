const { default: mongoose } = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
    unique: true,
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
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

userSchema.methods.getBackUser = async function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;

  return userObject;
};

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = await jwt.sign({ _id: user._id.toString() }, "mynameisjack");
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("unable to login");
  }
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    throw new Error("unable to login");
  }
  return user;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
