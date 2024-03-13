const express = require("express");
const app = express();
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

require("dotenv").config();
const PORT = process.env.PORT || 4000;

//cookie-parser - what is this and why we need this ?

app.use(express.json());
app.use(morgan("common"));
app.use(cookieParser());

require("./config/database").connect();
require("./cron/calls.cron");
require("./cron/tasks.cron");

app.get("/", (req, res) => {
  res.status(200).send("Hello From Backend...");
})

//route import and mount
const user = require("./routes/user.routes");
const task = require("./routes/tasks.routes");
const subtask = require("./routes/subtasks.routes");

app.use("/api/v1/auth", user);
app.use("/api/v1/tasks", task);
app.use("/api/v1/subtasks", subtask);
app.post("/api/v1/corncalls", user);

app.listen(PORT, () => {
  console.log(`App is listening at ${PORT}`);
});

const crypto = require('crypto');
const secret = require('crypto').randomBytes(64).toString('hex');

// const secret = crypto.randomBytes(32).toString('hex');
console.log(secret);
