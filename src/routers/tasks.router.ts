import { Router } from "express";
import { TaskController } from "../controllers";
import { ensure } from "../middlewares/ensure.middleware";
import { taskCreateSchema, taskUpdateSchema } from "../schemas/task.schema";


export const taskRouter = Router();

const controller = new TaskController();

taskRouter.post("/", ensure.validBody(taskCreateSchema), ensure.categoryIdExists, controller.create);

taskRouter.get("/", controller.read);

taskRouter.get("/:id", ensure.taskIdExists, controller.retrieve);

taskRouter.patch("/:id", ensure.taskIdExists, ensure.categoryIdExists, ensure.validBody(taskUpdateSchema), controller.update);

taskRouter.delete("/:id", ensure.taskIdExists, controller.delete);

