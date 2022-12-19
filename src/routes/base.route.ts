import { Router } from "express";
import * as urlController from "../services/url.service";

const baseRouter = Router().get("/:shortString", urlController.getOne);

export default baseRouter;
