const express = require("express");
const {
  registerTeam,
  updateTeam,
  viewTeamsDetails,
  delTeam,
  registeredTeamList,
} = require("../controllers/teams.ctrl");
const { authenticate, authorize } = require("../middlewares/auth.middleware");

const router = express.Router();

//creating aroutes
router.post("/addteam", authenticate, authorize, registerTeam);
router.patch("/editteam", authenticate, authorize, updateTeam);
router.get("/viewteams", authenticate, viewTeamsDetails);
router.get("/viewteamlists", registeredTeamList);
router.delete("/deleteteam", authenticate, authorize, delTeam);

module.exports = router;
