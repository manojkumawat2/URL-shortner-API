import { Router } from "express";
import urlRouter from "./url";

const router: Router = Router();

router.use("/url", urlRouter);

export default router;
