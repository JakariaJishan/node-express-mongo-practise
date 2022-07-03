const express = require("express");
const Task = require("../model/task");
const router = express.Router();

router.post("/tasks", (req, res) => {
  const tasks = new Task(req.body);
  tasks
    .save()
    .then(() => res.status(200).send(tasks))
    .catch((err) => res.status(500).send(err.message));
});

router.get("/tasks", (req, res) => {
  Task.find({})
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((error) => {
      res.status(500).send(error.message);
    });
});
router.get("/tasks/:id", (req, res) => {
  const _id = req.params.id;
  Task.findById(_id)
    .then((result) => {
      if (!result) {
        return res.status(500).send("faild");
      }
      res.status(200).send(result);
    })
    .catch((error) => {
      res.status(500).send(error.message);
    });
});

//update one
router.patch("/tasks/:id", async (req, res) => {
  const taskData = Object.keys(req.body);
  const validTasks = ["description", "completedTask"];
  const isValidOperation = taskData.every((task) => {
    return validTasks.includes(task);
  });

  if (!isValidOperation) {
    return res.status(500).send("error");
  }

  try {
    const tasks = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).send(tasks);
  } catch (error) {
    res.status(404).send("not found");
  }
});

module.exports = router;
