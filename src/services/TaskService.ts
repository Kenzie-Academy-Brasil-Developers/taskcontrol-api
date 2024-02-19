import { prisma } from "../database/prisma";
import { createTask, returnTask, updateTask } from "../interfaces/task.interfaces";
import { returnTaskSchema } from "../schemas";

export class TaskService {

    public create = async (payload: createTask): Promise<returnTask> => {

        const newTask = await prisma.task.create({category, ...payload});

        return returnTaskSchema.parse(newTask);
    }

    public read = async (search?: string): Promise<Array<returnTask>> => {

        if(search){
            const task = await prisma.task.findFirst({where: {
                category: { name: search}
            }});

            return returnTaskSchema.array().parse(task);
        }

        const allTasks = await prisma.task.findMany({ include: {category: true}})

        return returnTaskSchema.array().parse(allTasks)

    }

    public retrieve = async (taskId: number ): Promise<returnTask> => {

        const foundTask = await prisma.task.findFirst({where: {id: taskId }})

        return returnTaskSchema.parse(foundTask)
    }

    public update = async (taskId: number, data: updateTask): Promise<returnTask> => {

        const updateTask = await prisma.task.update({where: {id: taskId}, data});

        return returnTaskSchema.parse(updateTask)
    }

    public delete = async (taskId: number) => {

        return await prisma.task.delete({where: {id: taskId }});
    }




}
