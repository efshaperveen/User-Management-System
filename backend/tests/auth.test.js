const request = require("supertest");
const app = require("../app");
const User = require("../models/User");

describe("Auth APIs", () => {

  beforeEach(async () => {
    await User.deleteMany();
  });

  test("User Signup - Success", async () => {
    const res = await request(app)
      .post("/api/auth/signup")
      .send({
        fullName: "Test User",
        email: "test@test.com",
        password: "Test@1234",
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.token).toBeDefined();
  });

  test("User Login - Success", async () => {
    //  signup FIRST
    await request(app)
      .post("/api/auth/signup")
      .send({
        fullName: "Test User",
        email: "test@test.com",
        password: "Test@1234",
      });

    //  then login
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "test@test.com",
        password: "Test@1234",
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });

});


