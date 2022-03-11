//requiring the team model
const Teams = require("../models/teams.model");
//registering a new team on the app
const registerTeam = async (req, res, next) => {
  try {
    const { teamName, coachName, noOfPlayers, stadiumName } = req.body;
    if (!teamName || !coachName || !noOfPlayers || !stadiumName)
      return res.status(400).json({
        message: "fill in required fields",
      });

    const registerTeams = await Teams.create({
      teamName,
      coachName,
      noOfPlayers,
      stadiumName,
    });
    return res.status(201).json({
      message: "team registered successfully",
      registerTeams,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
//An endpoint for updating a team details
const updateTeam = async (req, res, next) => {
  try {
    const { _id } = req.headers;
    const updateTeam = await Teams.findOneAndUpdate({ _id }, req.body, {
      new: true,
    });
    return res.status(200).json({
      message: "Team updated",
      updateTeam,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
// An endpoint for collecting or viewing all teams registered on the app
const viewTeamsDetails = async (req, res, next) => {
  try {
    const viewTeams = await Teams.find();
    return res.status(200).json({
      message: "success",
      viewTeams,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
const delTeam = async (req, res, next) => {
  try {
    const { _id } = req.headers;
    const delTeam = await Teams.findOneAndDelete({ _id });
    return res.status(200).json({
      message: "success",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const registeredTeamList = async (req, res, next) => {
  try {
    const teamListArray = [];
    const allTeams = await Teams.find();
    console.log(allTeams)
    for (team of allTeams) {
      // teamListArray.push(team.teamName);
      teamListArray.push(`${allTeams.indexOf(team) + 1}. ${team.teamName}`);
    }
    const teamList = teamListArray.join(`  `);
    return res.status(200).json({
      teamList,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Server Error...
          ${error.message}`,
    });
  }
};

module.exports = {
  registerTeam,
  updateTeam,
  viewTeamsDetails,
  delTeam,
  registeredTeamList,
};
