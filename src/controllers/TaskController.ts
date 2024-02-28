import { Request, Response } from "express";
import { TaskService } from "../services/index";

export class TaskController {

    private taskService: TaskService = new TaskService();

    public create = async (req: Request, res: Response): Promise<Response> => {

        const id = res.locals.sub;
        const newTask = await this.taskService.create(req.body, id);

        return res.status(201).json(newTask);
    };

    public read = async (req: Request, res: Response): Promise<Response> => {

        const { category } = req.query;

        const allTasks = await this.taskService.read(category as string);

        
        console.log(allTasks);
        return res.status(200).json(allTasks);
    };

    public retrieve = async (req: Request, res: Response): Promise<Response> => {

        const taskId = Number(req.params.id);

        const retrievedTask = await this.taskService.retrieve(taskId);


        return res.status(200).json(retrievedTask);
    };

    public update = async (req: Request, res: Response): Promise<Response> => {

        const id = Number(req.params.id);
        const body = req.body;
        
        const updatedTask = await this.taskService.update(id, body)

        return res.status(200).json(updatedTask);
    };

    public delete = async (req: Request, res: Response): Promise<Response> => {

        const deleteTask = await this.taskService.delete(Number(req.params.id));

        return res.status(204).json(deleteTask);
    };
}