import { Request, Response, NextFunction } from "express";
import CustomError from "../model/errors";

const handleError = (
  error: CustomError,
  _request: Request,
  response: Response,
  _next: NextFunction
) => {
  const status = error.status || 400;
  const message = error.message || "Something went wrong";

  console.log(`Error ${status} - ${message}`);

  return response.status(status).send({
    status,
    message,
  });
};

const unknownEndpoint = (_request: Request, response: Response) => {
  return response.status(404).send({ error: "unknown endpoint" });
};

export { handleError, unknownEndpoint };
