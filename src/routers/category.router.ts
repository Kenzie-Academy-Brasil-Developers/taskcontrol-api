import { Router } from "express";
import { CategoryController } from "../controllers";
import { ensure } from "../middlewares/ensure.middleware"; 
import { createCategorySchema } from "../schemas";

export const categoryRouter = Router();
const controller = new CategoryController();

categoryRouter.post("/", ensure.validBody(createCategorySchema), controller.create);
categoryRouter.delete("/:id", ensure.category, controller.delete);