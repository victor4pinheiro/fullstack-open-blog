import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import Database from "../database/connection";
import UserInterface from "../interfaces/user";
import CustomError from "../model/errors";
import User from "../model/user";
import { SECRET } from "../utils/config";
import { comparePassword } from "../middleware/hash";


const login = async (request: Request, response: Response, next: NextFunction) => {
  const { username, password } = request.body as UserInterface;

  if (!(username && password))
    next(new CustomError("username or password empty", 400));

  try {
    const connection = await Database.connect();

    if (!connection)
      next(new CustomError("connection failed to database", 500));

    const user = (await User.findOne({ username })) as UserInterface;
    const passwordCorrect = await comparePassword(password, user.password);

    if (!(user && passwordCorrect))
      return next(new CustomError("invalid username or password", 400));

    const userForToken = {
      username: user.username,
      id: user.id,
    };

    const token = jwt.sign(userForToken, SECRET);

    response.status(200).send({ token, username: user.username, name: user.name });
  } catch (error) {
    next(error);
  } finally {
    await Database.disconnecting();
  }
};

const LoginControler = { login };
export default LoginControler;
