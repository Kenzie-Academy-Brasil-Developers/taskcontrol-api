import { Request, Response } from "express";
import { TaskService } from "../services/index";

export class TaskController {

    private taskService: TaskService = new TaskService();

    public create = async (req: Request, res: Response): Promise<Response> => {

        const newTask = await this.taskService.create(req.body);

        return res.status(201).json(newTask)
    }

    public read = async (req: Request, res: Response): Promise<Response> => {



        const allTasks = this.taskService.read(req.query.toLocaleString());

        return res.status(200).json(allTasks);
    }

    public retrieve = async (req: Request, res: Response): Promise<Response> => {

        const taskId  = Number(req.params);

        const retrievedTask = this.taskService.retrieve(taskId);

        return res.status(200).json(retrievedTask);
    }

    public update = async (req: Request, res: Response ): Promise<Response> => {

        const updatedTask = this.taskService.update(Number(req.params), req.body)

        return res.status(200).json(updatedTask);
    }

    public delete = async (req: Request, res: Response): Promise<Response> => {

        await this.taskService.delete(Number(req.params));

        return res.status(204).json();

    }


}