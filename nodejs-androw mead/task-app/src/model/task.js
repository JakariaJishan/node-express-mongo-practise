const { default: mongoose } = require("mongoose");

const taskSchema = new mongoose.Schema({
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
const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
