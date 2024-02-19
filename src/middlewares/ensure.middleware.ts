import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";
import { prisma } from "../database/prisma";
import { AppError } from "../errors";

class EnsureMiddleware {
    public validBody = (schema: AnyZodObject) => (req: Request, _: Response, next: NextFunction): void => {
        req.body = schema.parse(req.body);
        return next();
    }

    public categoryIdExists = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const { categoryId } = req.params;
        
        const foundCategory = await prisma.category.findFirst({ where: { id: Number(categoryId)}});

        if(!foundCategory) {
            throw new AppError("Category not found!", 404);
        }

        res.locals = { ...res.locals, foundCategory}

        return next();
    }

    public taskIdExists = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

        const { taskId } = req.params;

        const foundTask = await prisma.task.findFirst({ where: { id: Number(taskId)}});

        if(!foundTask) {
            throw new AppError("Task not found!", 404)
        }

        res.locals = { ...res.locals, foundTask }

        return next();

    }
};

export const ensure = new EnsureMiddleware();

