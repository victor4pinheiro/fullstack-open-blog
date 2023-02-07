import request from "supertest";
import app from "../app";
import Database from "../database/connection";
import Blog from "../model/blog";

const api = request(app);

const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0,
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0,
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0,
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0,
  },
];

describe("Blogs", () => {
  beforeEach(async () => {
    await Database.connect();
    await Blog.deleteMany({});
    await Blog.insertMany(blogs);
  });

  it("should return all initial notes", async () => {
    const response = await api.get("/api/blogs");
    expect(response.body).toHaveLength(blogs.length);
  });

  it("should check if there is a id property inside object", async () => {
    const response = await api.get("/api/blogs");
    expect(response.body[0].id).toBeDefined();
  });

  it("should return the new blog created", async () => {
    const newBlog = {
      title: "Test Driven Development: By Example",
      author: "Kent Beck",
      likes: 28,
      url: "https://www.amazon.com.br/Test-Driven-Development-Kent-Beck/dp/0321146530",
    };

    const responseCreation = await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const responseList = await api.get("/api/blogs");

    expect(responseCreation.body).toMatchObject(newBlog);
    expect(responseList.body).toHaveLength(blogs.length + 1);
  });

  it("should check if likes is 0 if it's missing from the request", async () => {
    const newBlog = {
      title: "Test Driven Development: By Example",
      author: "Kent Beck",
      url: "https://www.amazon.com.br/Test-Driven-Development-Kent-Beck/dp/0321146530",
    };

    const response = await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    expect(response.body.likes).toBe(0);
  });

  it("should fail with status code 400 if data is invalid", async () => {
    const newBlog = {
      url: "https://www.amazon.com.br/Test-Driven-Development-Kent-Beck/dp/0321146530",
    };

    await api.post("/api/blogs").send(newBlog).expect(400);

    const response = await api.get("/api/blogs");
    expect(response.body).toHaveLength(blogs.length);
  });

  it("should update the content of blog using id", async () => {
    const id = "5a422a851b54a676234d17f7";
    const blog = {
      title: "Update - React patterns",
      author: "Update - Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 8,
    };

    const result = await api.put(`/api/blogs/${id}`).send(blog);

    expect(result.body).toMatchObject(blog);

    const response = await api.get("/api/blogs");
    expect(response.body).toHaveLength(blogs.length);
  });

  it("should delete the blog using id", async () => {
    const id = "5a422a851b54a676234d17f7";
    await api.delete(`/api/blogs/${id}`).expect(204);

    const response = await api.get("/api/blogs");
    expect(response.body).toHaveLength(blogs.length - 1);
  });

  afterEach(async () => {
    await Database.disconnecting();
  });
});
