import { Schema, model } from "mongoose";
import { string } from "zod/lib";

const urlSchema = new Schema({
  baseUrl: String,
  shortedUrl: String,
});

export const UrlModel = model("url", urlSchema);
