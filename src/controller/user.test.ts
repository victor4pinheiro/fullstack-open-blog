import request from "supertest";
import app from "../app";
import Database from "../database/connection";
import hashPassword from "../middleware/hash";
import User from "../model/user";

const api = request(app);

const users = [
  {
    name: "Robert Cecil Martin",
    username: "Uncle Bob",
    password: "cleancode",
  },
  {
    name: "Kent Beck",
    username: "XP guy",
    password: "xppisthedude",
  },
  {
    name: "Linus Torvalds",
    username: "Linux guy",
    password: "talkischeap.showmethecode.",
  },
];

describe("Users", () => {
  beforeEach(async () => {
    await Database.connect();
    await User.deleteMany({});
    await User.insertMany(users);
  });

  it("should return the new user created", async () => {
    const newBlog = {
      name: "Dennis Ritchie",
      username: "Machine guy",
      password: "assemblyisgood.",
    };

    const responseCreation = await api
      .post("/api/users")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const responseList = await api.get("/api/users");

    const hashedPassword = hashPassword(newBlog.password);

    expect(responseCreation.body).toMatchObject({
      ...newBlog,
      password: hashedPassword,
    });
    expect(responseList.body).toHaveLength(users.length + 1);
  });

  it("should return error 400 when password length is less than 3", async () => {
    const newBlog = {
      name: "Dennis Ritchie",
      username: "Machine guy",
      password: "a.",
    };

    const response = await api.post("/api/users").send(newBlog).expect(400);

    expect(response.body).toStrictEqual({
      status: 400,
      message: "password invalid",
    });
  });

  afterAll(async () => {
    await Database.disconnecting();
  });
});
