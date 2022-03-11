const mongoose = require("mongoose");
const Team = mongoose.Schema;

const TeamSchema = new Team(
  {
    teamName: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      trim: true,
    },
    coachName: {
      type: String,
      required: true,
      trim: true,
    },
    noOfPlayers: {
      type: Number,
      required: true,
      trim: true,
    },
    stadiumName: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const TeamModel = mongoose.model("Team", TeamSchema);
module.exports = TeamModel;
