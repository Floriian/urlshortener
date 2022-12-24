import { Router } from "express";
import * as urlController from "../services/url.service";
import { schemaValidationMiddleware } from "../middlewares";
import { RequestUrlObject } from "../types";

const urlRouter: Router = Router();
urlRouter.post(
  "/",
  schemaValidationMiddleware("BODY", RequestUrlObject),
  urlController.createUrl
);

export default urlRouter;
