const { app } = require("../app");
const supertest = require("supertest");
const request = supertest(app);
const User = require("../src/models/user.model");
const mongoose = require("mongoose");
const { beforeEach, afterEach } = require("@jest/globals");
const databaseName = "User_test";

beforeAll(async () => {
  const url = `mongodb://127.0.0.1/${databaseName}`;
  await mongoose.connect(url, { useNewUrlParser: true });
});

beforeEach(async () => {
  await User.create(User);
});
describe("Users /api/v1", () => {
  it("should save user in the database", async () => {
    const res = await request.post("/registerUser").send({
      firstName: "ferd",
      lastName: "Ugochukwu",
      phoneNumber: "0908087765",
      email: "dede@gmail.com",
      password: "gfrjdhdkj",
    });
    const user = await User.findOne({ email: "dede@gmail.com" });
    expect(res.status).toBe(201);
    expect(user.firstName).toBeTruthy();
    expect(user.lastName).toBeTruthy();
    expect(user.phoneNumber).toBeTruthy();
    expect(user.email).toBeTruthy();
    expect(user.password).toBeTruthy();
  });

  it("should login a user", async () => {
    const res = await request.post("/loginUser").send({
      email: "dee@gmail.com",
      password: "6ttrjdhdkj",
    });
    const user = await User.findOne({ email: "dee@gmail.com" });
    expect(res.status).toBe(200);
    // expect(user.email).toBeTruthy();
    // expect(user.password).toBeTruthy();
  });
});
afterEach(async () => {
  await User.deleteMany();
});
