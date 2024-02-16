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
};

export const ensure = new EnsureMiddleware();

