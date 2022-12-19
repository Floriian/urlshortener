import { Request, Response } from "express";
import { RequestUrlModel, RequestUrlParams } from "../types";
import { z, ZodError } from "zod";
import { UrlModel } from "../schemas";

const chars = "QWERTZUIOPASDFGHJKLYXCVBNMqwertzuiopasdfghjklyxcvbnm0123456789";

function generateString(len: number): string {
  let generated: string = "";

  for (let i = 0; i < len; i++) {
    generated += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return generated;
}

export async function createUrl(req: Request, res: Response) {
  const body: RequestUrlModel = req.body;
  const urlSchema = z.object({
    baseUrl: z.string().url(),
  });
  const shortString = generateString(6);
  try {
    const parsed = await urlSchema.parse({
      baseUrl: body.baseUrl,
    });

    const findShort = await UrlModel.findOne({ shortedUrl: shortString });
    if (findShort) createUrl(req, res);

    const findBase = await UrlModel.findOne({ baseUrl: body.baseUrl });
    if (findBase) return res.status(200).json(findBase);

    const url = new UrlModel({
      baseUrl: parsed.baseUrl,
      shortedUrl: shortString,
    });

    await url.save();

    return res.status(201).json(url);
  } catch (e) {
    if (e instanceof ZodError) {
      return res.status(400).json(e);
    }
    throw e;
  }
}

export async function getOne(req: Request, res: Response) {
  const { shortString } = req.params;

  const findOne = await UrlModel.findOne({ shortedUrl: shortString });
  if (!findOne) return res.status(404);

  res.redirect(findOne.baseUrl!);
}
