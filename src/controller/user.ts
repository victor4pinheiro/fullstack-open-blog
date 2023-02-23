import { NextFunction, Request, Response } from "express";
import Database from "../database/connection";
import UserInterface from "../interfaces/user";
import User from "../model/user";
import CustomError from "../model/errors";
import { hashPassword } from "../middleware/hash";

const create = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const body = request.body as UserInterface;
  let passwordHashed;

  try {
    const { password } = body;

    if (password && password.length >= 3)
      passwordHashed = await hashPassword(password);
    else {
      next(new CustomError("password invalid", 400));
    }

    const user = new User({
      ...body,
      password: passwordHashed,
    });

    const connection = await Database.connect();

    if (!connection)
      next(new CustomError("connection failed to database", 500));

    const results = await user.save();
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

    const users = await User.find({});
    response.status(200).json(users);
  } catch (error) {
    next(error);
  } finally {
    await Database.disconnecting();
  }
};

const UserController = { create, getAll };
export default UserController;
