const express = require("express");
const router = express.Router();
const data = require("../mock");

router.patch("/:taskId", (req, res) => {
  const { taskId } = req.params;
  const body = req.body;
  const task = data.tasks.find((task) => task.id === taskId);

  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  const updatedTask = { ...task, ...body };
  data.tasks = data.tasks.map((task) =>
    task.id === taskId ? updatedTask : task
  );

  res.json(updatedTask);
});

router.delete("/:taskId", (req, res) => {
  const { taskId } = req.params;
  const task = data.tasks.find((task) => task.id === taskId);

  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  data.tasks = data.tasks.filter((task) => task.id !== taskId);

  res.json();
});

module.exports = router;
