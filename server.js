const express = require("express");
require("dotenv").config();
const connectDB = require("./src/db/connect.db");
const fixtureRouter = require("./src/router/fixture.router");
const teamRouter = require("./src/router/team.router.js");
const adminRouter = require("./src/router/admin.router");
const userRouter = require("./src/router/user.router");

// using express as a middleware
const app = express();
app.use(express.json());

const PORT = process.env.PORT;
connectDB;
//creating a baseurl for this project
app.get("/", (req, res) => {
  res.send({
    message: "Welcome Home",
  });
});
//executing each router for the models
app.use("/api/v1", userRouter);
app.use("/api/v1", adminRouter);
app.use("/api/v1", fixtureRouter);
app.use("/api/v1", teamRouter);

app.listen(PORT, () => {
  console.log(`server listening on ${PORT}`);
});
