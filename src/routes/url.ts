import { Router } from "express";
import { shortUrlGenerate } from "../services/url";

const urlRouter: Router = Router();

urlRouter.post("/", (req, res) => {
  shortUrlGenerate(req)
    .then((data) => {
      res.send({ ...data });
    })
    .catch((err: Error) => {
      const statusCode = (err as any)?.statusCode ?? 400;
      return res.status(statusCode).send({ error: err.message });
    });
});

export default urlRouter;
