const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { connection } = require("./db");
const { projectRouter } = require("./routes/project.route");
const { taskRouter } = require("./routes/task.route");
const app = express();

app.use(express.json());
app.use(cors());

app.use("/project", projectRouter);
app.use("/task", taskRouter);

app.listen(3300, async () => {
  await connection;
  console.log("server started on port 3300");
});
