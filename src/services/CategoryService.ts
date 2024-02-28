
import { prisma } from "../database/prisma";
import { CreateCategory, ReturnCategory } from "../interfaces";
import { categorySchema } from "../schemas";

export class CategoryService {

    public create = async (payload: CreateCategory, userId: number): Promise<ReturnCategory> => {

        const newCategory = await prisma.category.create({
             data: {
                ...payload,
                userId
             }})

        return newCategory;
    };

    public deleteOne = async (categoryId: number) => {

        const deleteCategory = await prisma.category.delete({ where: { id: categoryId } });

        return deleteCategory;
    };
}
