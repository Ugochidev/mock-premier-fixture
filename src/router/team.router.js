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

//route for creating or adding new teams
router.post("/addteam", authenticate, authorize, registerTeam);

//route for updating team details
router.patch("/editteam", authenticate, authorize, updateTeam);

//route to view all teams registered
router.get("/viewteams", authenticate, viewTeamsDetails);

router.get("/viewteamlists", registeredTeamList);

//route to delete team
router.delete("/deleteteam", authenticate, authorize, delTeam);

module.exports = router;
