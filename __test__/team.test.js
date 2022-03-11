const { app } = require("../app");
const supertest = require("supertest");
const request = supertest(app);
const Team = require("../src/models/teams.model");
const mongoose = require("mongoose");
const { beforeEach, afterEach } = require("@jest/globals");
const databaseName = "teams_test";

beforeAll(async () => {
  const url = `mongodb://127.0.0.1/${databaseName}`;
  await mongoose.connect(url, { useNewUrlParser: true });
});

beforeEach(async () => {
  await Team.create(Team);
});
describe("Team /api/v1", () => {
  it("should save team in the database", async () => {
    const res = await request.post("/registerTeam").send({
      teamName: "chelsea",
      coachName: "Ugochidev",
      noOfPlayers: "20",
      stadiumName: "standford",
    });
    const team = await Team.findOne({ teamName: "Chelsea" });
    expect(res.status).toBe(201);
    expect(team.teamName).toBeTruthy();
    expect(team.coachName).toBeTruthy();
    expect(team.stadiumName).toBeTruthy();
  });
  it("should GET all teams", async () => {
    const res = await request.get("/viewteams");
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("GetTeams");
  });
  it("should GET all teamlists", async () => {
    const res = await request.get("/viewteamlists");
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("GetTeamLists");
  });
  it("should edit teamName", async () => {
    const res = await request.patch("/editteam");
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Team Updated");
  });
  it("should remove team", async () => {
    const res = await request.delete("/deleteteam");
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Team Deleted");
  });
});
afterEach(async () => {
  await Team.deleteMany();
});
