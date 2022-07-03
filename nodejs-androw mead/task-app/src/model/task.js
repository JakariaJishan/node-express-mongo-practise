const { default: mongoose } = require("mongoose");

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

module.exports = Task;