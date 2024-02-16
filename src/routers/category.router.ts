import { Router } from "express";
import { CategoryController } from "../controllers";
import { ensure } from "../middlewares/ensure.middleware"; 

export const categoryRouter = Router();

const controller = new CategoryController();

categoryRouter.post("", controller.create);

categoryRouter.use("/:genreId", ensure.categoryIdExists);

categoryRouter.delete("/:categoryId", controller.delete);