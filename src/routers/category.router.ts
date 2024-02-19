import { Router } from "express";
import { CategoryController } from "../controllers";
import { ensure } from "../middlewares/ensure.middleware"; 

export const categoryRouter = Router();

const controller = new CategoryController();

categoryRouter.post("", controller.create);


categoryRouter.delete("/:id", ensure.categoryIdExists, controller.delete);