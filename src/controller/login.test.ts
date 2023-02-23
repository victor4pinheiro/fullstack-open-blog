import request from "supertest";
import app from "../app";
import Database from "../database/connection";
import User from "../model/user";

const api = request(app);

const user = {
  username: "Machine guy",
  name: "Dennis Ritchie",
  password: "assemblyisgood.",
};

describe("login", () => {
  beforeEach(async () => {
    await Database.connect();
    await User.deleteMany({});
    await api.post("/api/users").send(user).expect(201);
  });

  it("should return the token according to specified user", async () => {
    const newUser = {
      username: "Machine guy",
      password: "assemblyisgood."
    };

    const response = await api
      .post("/api/login")
      .send(newUser)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(response.body).toHaveProperty("token");
  });

  afterAll(async () => {
    await Database.disconnecting();
  });
});
