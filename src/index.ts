import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import router from "./routes";
import bodyParser from "body-parser";
import { getRedirectionUrl } from "./services/url";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(bodyParser.json());

app.use("/api/v1", router);
app.get("/:shortId", (req, res) => {
  getRedirectionUrl(req)
    .then((data) => {
      return res
        .status(301)
        .redirect(data?.longUrl ?? process.env.SERVER_ADDRESS);
    })
    .catch((err) => {
      const statusCode = (err as any)?.statusCode ?? 500;
      res.status(statusCode).send(err.message);
    });
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
