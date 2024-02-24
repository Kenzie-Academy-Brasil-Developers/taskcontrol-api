import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { ensure } from "../middlewares/ensure.middleware";
import { userCreateSchema } from "../schemas";

export const userRouter = Router();

const controller = new UserController();

userRouter.post("/", ensure.validBody(userCreateSchema), ensure.emailIsUnique, controller.create );