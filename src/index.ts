import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import urlRouter from "./routes/url.route";
import baseRouter from "./routes/base.route";
import { initRedis } from "./utils";

const app: express.Application = express();
const port = process.env.PORT || 5400;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/url", urlRouter);
app.use("/", baseRouter);

async function main() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/linkshortener");

    await initRedis();
    await app.listen(port, () => {
      console.log(`App is listening on port ${port}`);
    });
  } catch (e: any) {
    console.error(`Error: ${e.message}`);
  }
}
main();
