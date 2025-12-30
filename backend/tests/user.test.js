const request = require("supertest");
const app = require("../app");
const User = require("../models/User");
const bcrypt = require("bcrypt");

let adminToken;

beforeEach(async () => {
  await User.deleteMany();

  await User.create({
    fullName: "Admin User",
    email: "admin@test.com",
    password: await bcrypt.hash("Admin@123", 10),
    role: "admin",
  });

  const res = await request(app)
    .post("/api/auth/login")
    .send({
      email: "admin@test.com",
      password: "Admin@123",
    });

  adminToken = res.body.token;
});

test("Admin can get all users", async () => {
  const res = await request(app)
    .get("/api/users")
    .set("Authorization", `Bearer ${adminToken}`);

  expect(res.statusCode).toBe(200);
  expect(res.body.users.length).toBeGreaterThan(0);
});

