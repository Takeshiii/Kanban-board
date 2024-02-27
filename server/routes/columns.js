const express = require("express");
const { nanoid } = require("nanoid");
const router = express.Router();
const data = require("../mock");

router.get("/:columnId/cards", (req, res) => {
  const { columnId } = req.params;
  const column = data.columns.find((column) => column.id === columnId);
  const cards = data.cards.filter((card) => column.cards.includes(card.id));

  if (!cards) {
    return res.status(404).json({ error: "Cards not found" });
  }

  res.json(cards);
});

router.post("/:columnId/cards", (req, res) => {
  const newCardId = nanoid();
  const body = req.body;
  const { columnId } = req.params;
  const newCard = { id: newCardId, ...body };
  const column = data.columns.find((column) => column.id === columnId);

  if (!column) {
    return res.status(404).json({ error: "Column not found" });
  }

  const updatedColumn = { ...column };
  updatedColumn.cards = [...updatedColumn.cards, newCard.id];

  data.cards = [...data.cards, newCard];
  data.columns = data.columns.map((column) =>
    column.id === columnId ? updatedColumn : column
  );

  res.json(newCard);
});

router.patch("/:columnId", (req, res) => {
  const { columnId } = req.params;
  const body = req.body;
  const column = data.columns.find((column) => column.id === columnId);

  if (!column) {
    return res.status(404).json({ error: "Column not found" });
  }

  const updatedColumn = { ...column, ...body };
  data.columns = data.columns.map((column) =>
    column.id === columnId ? updatedColumn : column
  );

  res.json(updatedColumn);
});

router.delete("/:columnId", (req, res) => {
  const { columnId } = req.params;
  const column = data.columns.find((column) => column.id === columnId);

  if (!column) {
    return res.status(404).json({ error: "Column not found" });
  }

  data.columns = data.columns.filter((column) => column.id !== columnId);
  data.cards = data.cards.filter((card) => !column.cards.includes(card.id));
  data.tasks = data.tasks.filter(
    (task) => !data.cards.some((card) => card.tasks.includes(task.id))
  );

  res.json();
});

module.exports = router;
