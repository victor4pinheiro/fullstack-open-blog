import request from "supertest";
import app from "../app";
import Database from "../database/connection";
import User from "../model/user";

const api = request(app);

const users = [
  {
    username: "Uncle Bob",
    name: "Robert Cecil Martin",
    password: "cleancode",
    __v: 0,
    _id: "63f4f07c3e8785465e3a5813",
  },
  {
    username: "XP guy",
    name: "Kent Beck",
    password: "xppisthedude",
    __v: 0,
    _id: "63f4f07c3e8785465e3a5814",
  },
  {
    username: "Linux guy",
    name: "Linus Torvalds",
    password: "talkischeap.showmethecode.",
    __v: 0,
    _id: "63f4f07c3e8785465e3a5815",
  },
];

describe("Users", () => {
  beforeEach(async () => {
    await Database.connect();
    await User.deleteMany({});
    await User.insertMany(users);
  });

  it("should return the new user created", async () => {
    const newUser = {
      username: "Machine guy",
      name: "Dennis Ritchie",
      password: "assemblyisgood.",
      __v: 0,
      id: "63f4fd24f0cfdcd3823fa3d3",
    };

    const responseCreation = await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const responseList = await api.get("/api/users");

    expect(responseCreation.body).toMatchObject({
      name: newUser.name,
      username: newUser.username,
    });
    expect(responseList.body).toHaveLength(users.length + 1);
  });

  it("should return error 400 when password length is less than 3", async () => {
    const newUser = {
      username: "Machine guy",
      name: "Dennis Ritchie",
      password: "a.",
      __v: 0,
      id: "63f4fd24f0cfdcd3823fa3d3",
    };

    const response = await api.post("/api/users").send(newUser).expect(400);

    expect(response.body).toStrictEqual({
      status: 400,
      message: "password invalid",
    });
  });

  afterAll(async () => {
    await Database.disconnecting();
  });
});
