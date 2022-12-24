import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";
import { ValidatorOptions } from "../types";

export function schemaValidationMiddleware(
  options: ValidatorOptions,
  object: AnyZodObject
) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (options === "BODY") {
        req.body = await object.parseAsync(req.body);
      }
      if (options === "PARAMS") {
        req.params = await object.parseAsync(req.params);
      }
      if (options === "QUERY") {
        req.query = await object.parseAsync(req.query);
      }
      next();
    } catch (e) {
      res.status(400).json(e);
    }
  };
}
