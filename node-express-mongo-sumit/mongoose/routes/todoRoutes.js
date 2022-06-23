const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const todoSchema = require("../schemas/todoSchema");
const Todo = new mongoose.model("Todo", todoSchema);
const checkLogIn = require("../middlewares/checkLogIn")

//can use .select for hide selected value, .limit for limit, .exec for execution ,,,these are called method chaining.
router.get("/", checkLogIn, async (req, res) => {
  await Todo.find({
    /* filter kora jay --status: "inactive" */
  })
    .select({
      _id: 0,
      date: 0,
    })
    .limit(2)
    .exec((err, todo) => {
      if (err) {
        res.status(500).json({
          error: "there was an server error",
        });
      } else {
        res.status(200).json({
          result: todo,
          message: "data inserted successfully",
        });
      }
    });
});

router.get("/:id", async (req, res) => {
  await Todo.find({ _id: req.params.id }, (err, data) => {
    if (err) {
      res.status(500).json({
        error: "there was an server error",
      });
    } else {
      res.status(200).json({
        result: data,
        message: "data inserted successfully",
      });
    }
  }).clone();
});

router.post("/", async (req, res) => {
  const newTodo = new Todo(req.body);
  await newTodo.save((err) => {
    if (err) {
      res.status(500).json({
        error: "there was an server error",
      });
    } else {
      res.status(200).json({
        message: "data inserted successfully",
      });
    }
  });
});

router.post("/multiple", async (req, res) => {
  await Todo.insertMany(req.body, (err, data) => {
    if (err) {
      res.status(500).json({
        error: "there was an server error",
      });
    } else {
      res.status(200).json({
        message: "data inserted successfully",
      });
    }
  });
});

router.put("/:id", async (req, res) => {
  const result = await Todo.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        status: "active",
      },
    },
    {
      useFindAndModify: true,
    },
    (err) => {
      if (err) {
        res.status(500).json({
          error: "server side error",
        });
      } else {
        res.status(200).json({
          message: "data updated successfully",
        });
      }
    }
  ).clone();
  console.log(result);
});

router.delete("/:id", async (req, res) => {
  await Todo.deleteOne({ _id: req.params.id }, (err) => {
    if (err) {
      res.status(500).json({
        error: "there was an server error",
      });
    } else {
      res.status(200).json({ message: "deleted successfully" });
    }
  }).clone();
});

module.exports = router;
