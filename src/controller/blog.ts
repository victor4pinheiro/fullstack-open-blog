import { NextFunction, Request, Response } from "express";
import Database from "../database/connection";
import Blog from "../model/blog";

const create = (request: Request, response: Response, next: NextFunction) => {
  const body = request.body as object;

  const blog = new Blog({
    ...body,
  });

  Database.connect()
    .then(() => {
      blog
        .save()
        .then((results) => response.status(201).json(results))
        .catch((error) => next(error))
        .finally(() => {
          void Database.disconnecting();
        });
    })
    .catch((error) => next(error));
};

const getAll = (_request: Request, response: Response, next: NextFunction) => {
  Database.connect()
    .then(() => {
      Blog.find({})
        .then((blogs) => response.status(200).json(blogs))
        .catch((error) => next(error))
        .finally(() => {
          void Database.disconnecting();
        });
    })
    .catch((error) => next(error));
};

const BlogController = { create, getAll };
export default BlogController;
