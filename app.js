const express = require("express");
const Admin = require("./src/models/admin.model");
const User = require("./src/models/user.model");
const Fixtures = require("./src/models/fixtures.model");
const Team = require("./src/models/teams.model");
const app = express();
app.use(express.json());
const connectDB = require("./src/db/connect.db");
connectDB;
app.use(express.urlencoded({ extended: true }));

app.get("/test", (req, res) => {
  res.json({ message: "testing endpoints" });
});

app.post("/registerAdmin", async (req, res) => {
  const { firstName, lastName, phoneNumber, email, password } = req.body;
  const newAdmin = new Admin({
    firstName,
    lastName,
    phoneNumber,
    email,
    password,
  });
  const admin = await newAdmin.save();

  res.status(201).json(admin);
});
app.post("/registerUser", async (req, res) => {
  const { firstName, lastName, phoneNumber, email, password } = req.body;
  const newUser = new User({
    firstName,
    lastName,
    phoneNumber,
    email,
    password,
  });
  const user = await newUser.save();

  res.status(201).json(user);
});
app.get("/getfixtures", (req, res) => {
  let fixture = [
    {
      stadium: "standford",
      teams: { id: "tygfd", id: "iwiujdh" },
      homeTeam: "chelsea",
      date: "2022-03-24",
    },
  ];
  return res.status(200).json({ message: "Getfixtures" });
});
app.post("/addfixture", async (req, res) => {
  const { stadium, teams, homeTeam, date } = req.body;
  const newFixtures = new Fixtures({
    stadium,
    teams,
    homeTeam,
    date,
  });
  const fixture = await newFixtures.save();

  res.status(201).json(fixture);
});
app.post("/loginUser", async (req, res) => {
  const { email, password } = req.body;
  res.status(200).json("login successfully");
});
app.post("/loginAdmin", async (req, res) => {
  const { email, password } = req.body;
  res.status(200).json("login successfully");
});
app.post("/registerTeam", async (req, res) => {
  const { teamName, coachName, noOfPlayers, stadiumName } = req.body;
  const newTeam = new Team({
    teamName,
    coachName,
    noOfPlayers,
    stadiumName,
  });
  const team = await newTeam.save();

  res.status(201).json(team);
});
app.get("/viewteams", (req, res) => {
  let team = [
    {
      teamName: "chelsea",
      coachName: "Ugochidev",
      noOfPlayers: "20",
      stadiumName: "standford",
    },
  ];
  return res.status(200).json({ message: "GetTeams" });
});
app.get("/viewteamlists", (req, res) => {
  let teamlists = [
    {
      team1: "chelsea",
      team2: "Man-city",
    },
  ];
  return res.status(200).json({ message: "GetTeamLists" });
});
app.patch("/editteam", (req, res) => {
  let editTeam = [
    {
      teamName: "Man-city",
    },
  ];
  return res.status(200).json({ message: "Team Updated" });
});
app.delete("/deleteteam", (req, res) => {
  let removeTeam = [
    {
      teamName: "Man-city",
    },
  ];
  return res.status(200).json({ message: "Team Deleted" });
});
module.exports = { app };
