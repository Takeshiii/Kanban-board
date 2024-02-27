const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
app.use(cors());
app.use(bodyParser.json());

const boardsRoute = require("./routes/boards");
const columnsRoute = require("./routes/columns");
const cardsRoute = require("./routes/cards");
const tasksRoute = require("./routes/tasks");

app.use("/api/boards", boardsRoute);
app.use("/api/columns", columnsRoute);
app.use("/api/cards", cardsRoute);
app.use("/api/tasks", tasksRoute);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
