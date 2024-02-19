import { Request, Response } from "express";
import { CategoryService } from "../services/CategoryService";

export class CategoryController {

    private categoryService: CategoryService = new CategoryService();

    public create = async (req:Request, res:Response): Promise<Response> => {

        const newCategory = await this.categoryService.create(req.body)

        return res.status(201).json(newCategory);
    }

    public delete = async (req: Request, res: Response): Promise<Response> => {

        const categoryId = req.params;

        await this.categoryService.deleteOne(Number(categoryId))

        return res.status(204).json();

    }


}