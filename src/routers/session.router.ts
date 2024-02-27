import { Router } from "express";
import { SessionController } from "../controllers/SessionController";
import { ensure } from "../middlewares/ensure.middleware";
import { sessionCreateSchema } from "../schemas";

export const sessionRouter = Router();

const controller = new SessionController();

sessionRouter.post("/", ensure.validBody(sessionCreateSchema), controller.login)