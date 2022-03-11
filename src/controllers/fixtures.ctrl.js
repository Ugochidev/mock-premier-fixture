const Fixtures = require("../models/fixtures.model");

const CreateFixtures = async (req, res, next) => {
  try {
    const { stadium, id, homeTeam, date } = req.body;
    if (!stadium || !id || !homeTeam || !date)
      return res.status(400).json({
        message: "fill in required fields",
      });

    const CreateFixtures = await Fixtures.create({
      stadium,
      teams: id,
      homeTeam,
      date,
    });
    return res.status(201).json({
      message: "fixtures created successfully",
      CreateFixtures,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
const editFixtures = async (req, res, next) => {
  try {
    const { _id } = req.headers;
    const editFixtures = await Fixtures.findOneAndUpdate({ _id }, req.body, {
      new: true,
    })
      .find()
      .populate("teams", {
        teamName: 1,
        _id: 0,
      });
    return res.status(200).json({
      message: "fixtures updated successfully",
      editFixtures,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
const viewFixtures = async (req, res, next) => {
  try {
    const viewFixture = await Fixtures.find().populate("teams", {
      teamName: 1,
      _id: 0,
    });
    return res.status(200).json({
      message: "success",
      viewFixture,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
const removeFixtures = async (req, res, next) => {
  try {
    const { _id } = req.headers;
    const removeFixtures = await Fixtures.find({ _id });
    return res.status(200).json({
      message: "fixtures deleted",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
const completedFixtures = async (req, res, next) => {
  try {
    const completedFixts = [];
    const allCompletedFixs = await Fixtures.find().populate("teams", {
      teamName: 1,
      _id: 0,
    });
    console.log(allCompletedFixs);
    for (allCompletedFix of allCompletedFixs) {
      if (allCompletedFix.status === "completed") {
        completedFixts.push(allCompletedFix);
      }
    }
    return res.status(200).json({
      completedFixts,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Server Error...
          ${error.message}`,
    });
  }
};

const pendingFixtures = async (req, res, next) => {
  try {
    const pendingFixts = [];
    const allPendingFixs = await Fixtures.find().populate("teams", {
      teamName: 1,
      _id: 0,
    });
    for (pendingFix of allPendingFixs) {
      if (pendingFix.status === "pending") {
        pendingFixts.push(pendingFix);
      }
    }
    return res.status(200).json({
      pendingFixts,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Server Error...
          ${error.message}`,
    });
  }
};

module.exports = {
  CreateFixtures,
  editFixtures,
  viewFixtures,
  removeFixtures,
  completedFixtures,
  pendingFixtures,
};
