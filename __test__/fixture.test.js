const { app } = require("../app");
const supertest = require("supertest");
const request = supertest(app);
const Fixtures = require("../src/models/fixtures.model");
const mongoose = require("mongoose");
const { beforeEach, afterEach } = require("@jest/globals");
const databaseName = "Fixtures_test";

beforeAll(async () => {
  const url = `mongodb://127.0.0.1/${databaseName}`;
  await mongoose.connect(url, { useNewUrlParser: true });
});

beforeEach(async () => {
  await Fixtures.create(Fixtures);
});
describe("fixtures /api/v1", () => {
  it("should save fixture in the database", async () => {
    const res = await request.post("/addfixture").send({
      stadium: "standford",
      id: ["iwiujdh", "ihyhgyg"],
      homeTeam: "chelsea",
      date: "2022-03-24",
    });
    const fixture = await Fixtures.findOne({ homeTeam: "chelsea" });
    expect(res.status).toBe(201);
    expect(fixture.stadium).toBeTruthy();
    expect(fixture.teams).toBeTruthy();
    expect(fixture.homeTeam).toBeTruthy();
    expect(fixture.date).toBeTruthy();
  });

  it("should GET all users details", async () => {
    const res = await request.get("/getfixtures");
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Getfixtures");
  });
  it("should edit fixture", async () => {
    const res = await request.patch("/updatefixture");
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Fixture Updated");
  });
  it("should remove fixture", async () => {
    const res = await request.delete("/removefixture");
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Fixture Deleted");
  });
  it("should get completed fixture", async () => {
    const res = await request.get("/completedfixtures");
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("completed fixtures");
  });
   it("should get pending fixture", async () => {
     const res = await request.get("/pendingfixtures");
     expect(res.status).toBe(200);
     expect(res.body.message).toBe("Pending fixtures");
   });
});
afterEach(async () => {
  await Fixtures.deleteMany();
});
