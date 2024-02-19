import e, { Router } from "express";
import { TaskController } from "../controllers";
import { ensure } from "../middlewares/ensure.middleware";

export const taskRouter = Router();

const controller = new TaskController();

taskRouter.post("", ensure.categoryIdExists, controller.create);

taskRouter.get("", ensure.categoryIdExists, controller.read);

taskRouter.use("/:id", ensure.taskIdExists, ensure.categoryIdExists);

taskRouter.get("/:id", ensure.taskIdExists, controller.retrieve );

taskRouter.patch("/:id", ensure.taskIdExists, ensure.categoryIdExists, controller.update);

taskRouter.delete("/:id", ensure.taskIdExists, controller.delete);

