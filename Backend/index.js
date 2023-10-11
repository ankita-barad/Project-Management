const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { connection } = require("./db");
const { projectRouter } = require("./routes/project.route");
const { taskRouter } = require("./routes/task.route");
const { userRouter } = require("./routes/user.route");
const app = express();

app.use(express.json());
app.use(cors());

app.use("/project", projectRouter);
app.use("/task", taskRouter);
app.use("/user", userRouter);

app.listen(3310, async () => {
  await connection;
  console.log("server started on port 3310");
});
