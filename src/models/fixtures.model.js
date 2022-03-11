const mongoose = require("mongoose");
const Fixtures = mongoose.Schema;

// const Team = {
//   type: mongoose.Schema.Types.ObjectId,
//   ref: "Team",
//   name: {
//     type: String,
//   },
//   score: { type: Number, default: 0 },
// };

const FixtureSchema = new Fixtures(
  {
    teams: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team",
        required: true,
      },
    ],
    date: {
      type: Date,
      required: true,
    },
    stadium: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["completed", "pending"],
      default: "pending",
      trim: true,
    },
    homeTeam: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);
const FixturesModel = mongoose.model("Fixtures", FixtureSchema);
module.exports = FixturesModel;
