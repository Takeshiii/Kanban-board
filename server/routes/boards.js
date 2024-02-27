const express = require("express");
const { nanoid } = require("nanoid");
const router = express.Router();
const data = require("../mock");

router.get("/", (req, res) => {
  res.json(data.boards);
});

router.get("/:boardId", (req, res) => {
  const { boardId } = req.params;
  const board = data.boards.find((board) => board.id === boardId);

  if (!board) {
    return res.status(404).json({ error: "Board not found" });
  }

  res.json(board);
});

router.post("/", (req, res) => {
  const newBoardId = nanoid();
  const body = req.body;
  const newBoard = { id: newBoardId, ...body };
  data.boards = [...data.boards, newBoard];
  res.json(newBoard);
});

router.patch("/:boardId", (req, res) => {
  const { boardId } = req.params;
  const body = req.body;
  const board = data.boards.find((board) => board.id === boardId);

  if (!board) {
    return res.status(404).json({ error: "Board not found" });
  }

  const updatedBoard = { ...board, ...body };
  data.boards = data.boards.map((board) =>
    board.id === boardId ? updatedBoard : board
  );

  res.json(updatedBoard);
});

router.delete("/:boardId", (req, res) => {
  const { boardId } = req.params;
  const board = data.boards.find((board) => board.id === boardId);

  if (!board) {
    return res.status(404).json({ error: "Board not found" });
  }

  data.boards = data.boards.filter((board) => board.id !== boardId);
  data.columns = data.columns.filter(
    (column) => !board.columns.includes(column.id)
  );
  data.cards = data.cards.filter(
    (card) => !data.columns.some((column) => column.cards.includes(card.id))
  );
  data.tasks = data.tasks.filter(
    (task) => !data.cards.some((card) => card.tasks.includes(task.id))
  );

  res.json();
});

router.get("/:boardId/columns", (req, res) => {
  const { boardId } = req.params;
  const board = data.boards.find((board) => board.id === boardId);
  const columns = data.columns.filter((column) =>
    board.columns.includes(column.id)
  );

  if (!columns) {
    return res.status(404).json({ error: "Columns not found" });
  }

  res.json(columns);
});

router.post("/:boardId/columns", (req, res) => {
  const newColumnId = nanoid();
  const body = req.body;
  const { boardId } = req.params;
  const newColumn = { id: newColumnId, ...body };
  const board = data.boards.find((board) => board.id === boardId);

  if (!board) {
    res.status(404).json({ error: "Board not found" });
    return;
  }

  const updatedBoard = { ...board };
  updatedBoard.columns = [...updatedBoard.columns, newColumn.id];

  data.columns = [...data.columns, newColumn];
  data.boards = data.boards.map((board) =>
    board.id === boardId ? updatedBoard : board
  );

  res.json(newColumn);
});

module.exports = router;
