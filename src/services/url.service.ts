import { Request, Response } from "express";
import { RequestUrlModel } from "../types";
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

  const findUrlByBase = await UrlModel.findOne({ baseUrl: body.baseUrl });
  if (findUrlByBase) return res.status(200).json(findUrlByBase);

  const shortUrl = generateString(6);
  const findByShortUrl = await UrlModel.findOne({ shortedUrl: shortUrl });
  if (findByShortUrl) createUrl(req, res);

  const createdUrl = new UrlModel({
    baseUrl: body.baseUrl,
    shortedUrl: shortUrl,
  });

  await createdUrl.save();
  res.status(201).json(createdUrl);
}

export async function getOne(req: Request, res: Response) {
  const { shortString } = req.params;

  const findOne = await UrlModel.findOne({ shortedUrl: shortString });
  if (!findOne) return res.status(404);

  res.redirect(findOne.baseUrl!);
}
