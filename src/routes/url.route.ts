import { Request, Response, Router } from "express";
import { RequestUrlModel } from "../types";
import { UrlModel } from "../schemas";
import * as urlController from "../services/url.service";

const urlRouter: Router = Router();

urlRouter.post("/", urlController.createUrl);

export default urlRouter;
