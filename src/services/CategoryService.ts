
import { prisma } from "../database/prisma";
import { CreateCategory } from "../interfaces";

export class CategoryService {

    public create = async (payload: CreateCategory) => {

        const newCategory = await prisma.category.create({ data: payload });

        return newCategory;
    };

    public deleteOne = async (categoryId: number) => {

        const deleteCategory = await prisma.category.delete({ where: { id: categoryId } });

        return deleteCategory;
    };
}
