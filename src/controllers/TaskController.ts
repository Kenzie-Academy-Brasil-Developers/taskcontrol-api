import { Request, Response } from "express";
import { TaskService } from "../services/index";

export class TaskController {

    private taskService: TaskService = new TaskService();

    public create = async (req: Request, res: Response): Promise<Response> => {

        const newTask = await this.taskService.create(req.body);

        return res.status(201).json(newTask)
    }

    public read = async (_: Request, res: Response): Promise<Response> => {
        const allTasks = this.taskService.read();

        return res.status(200).json(allTasks);

    }

}