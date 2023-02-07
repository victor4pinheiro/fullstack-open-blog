import { NextFunction, Request, Response } from "express";
import Database from "../database/connection";
import BlogInterface from "../interfaces/blog";
import Blog from "../model/blog";
import CustomError from "../model/errors";

const create = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const body = request.body as BlogInterface;
  const likes = body.likes ? body.likes : 0;

  const blog = new Blog({
    ...body,
    likes,
  });

  try {
    const connection = await Database.connect();

    if (!connection)
      next(new CustomError("connection failed to database", 500));

    const results = await blog.save();
    response.status(201).json(results);
  } catch (error) {
    next(error);
  } finally {
    await Database.disconnecting();
  }
};

const getAll = async (
  _request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const connection = await Database.connect();

    if (!connection)
      next(new CustomError("connection failed to database", 500));

    const blogs = await Blog.find({});
    response.status(200).json(blogs);
  } catch (error) {
    next(error);
  } finally {
    await Database.disconnecting();
  }
};

const update = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const connection = await Database.connect();

    if (!connection)
      next(new CustomError("connection failed to database", 500));

    const id = request.params.id;
    const blog = request.body as BlogInterface;
    const likes = blog.likes ? blog.likes : 0;

    const newBlog = new Blog({
      _id: id,
      ...blog,
      likes,
    });

    const result = await Blog.findByIdAndUpdate(id, newBlog, {
      new: true,
      runValidators: true,
      context: "query",
    });

    response.status(200).json(result);
  } catch (error) {
    next(error);
  } finally {
    await Database.disconnecting();
  }
};

const remove = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const connection = await Database.connect();

    if (!connection)
      next(new CustomError("connection failed to database", 500));

    const id = request.params.id;
    await Blog.findByIdAndDelete(id);
    response.status(204).end();
  } catch (error) {
    next(error);
  } finally {
    await Database.disconnecting();
  }
};

const BlogController = { create, getAll, update, remove };
export default BlogController;
