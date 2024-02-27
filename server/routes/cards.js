const express = require("express");
const { nanoid } = require("nanoid");
const router = express.Router();
const data = require("../mock");

router.get("/:cardId", (req, res) => {
  const { cardId } = req.params;
  const card = data.cards.find((card) => card.id === cardId);

  if (!card) {
    return res.status(404).json({ error: "Card not found" });
  }

  res.json(card);
});

router.get("/:cardId/tasks", (req, res) => {
  const { cardId } = req.params;
  const card = data.cards.find((card) => card.id === cardId);
  const tasks = data.tasks.filter((task) => card.tasks.includes(task.id));

  if (!tasks) {
    res.status(404).json({ error: "Tasks not found" });
    return;
  }

  res.json(tasks);
});

router.post("/:cardId/tasks", (req, res) => {
  const newTaskId = nanoid();
  const body = req.body;
  const { cardId } = req.params;
  const newTask = { id: newTaskId, ...body };
  const card = data.cards.find((card) => card.id === cardId);

  if (!card) {
    return res.status(404).json({ error: "Card not found" });
  }

  const updatedCard = { ...card };
  updatedCard.tasks = [...updatedCard.tasks, newTask.id];

  data.tasks = [...data.tasks, newTask];
  data.cards = data.cards.map((card) =>
    card.id === cardId ? updatedCard : card
  );

  res.json(newTask);
});

router.patch("/:cardId", (req, res) => {
  const { cardId } = req.params;
  const body = req.body;
  const card = data.cards.find((card) => card.id === cardId);

  if (!card) {
    return res.status(404).json({ error: "Card not found" });
  }

  const updatedCard = { ...card, ...body };
  data.cards = data.cards.map((card) =>
    card.id === cardId ? updatedCard : card
  );

  res.json(updatedCard);
});

router.delete("/:cardId", (req, res) => {
  const { cardId } = req.params;
  const card = data.cards.find((card) => card.id === cardId);

  if (!card) {
    return res.status(404).json({ error: "Card not found" });
  }

  data.cards = data.cards.filter((card) => card.id !== cardId);
  data.tasks = data.tasks.filter((task) => !card.tasks.includes(task.id));

  res.json();
});

module.exports = router;
