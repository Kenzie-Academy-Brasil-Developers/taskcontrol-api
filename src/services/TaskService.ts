import { prisma } from "../database/prisma";
import { createTask, returnTask, updateTask } from "../interfaces/task.interfaces";
import { returnTaskSchema } from "../schemas";

export class TaskService {

    public create = async (payload: createTask): Promise<returnTask> => {

        const newTask = await prisma.task.create({data: payload});

        return returnTaskSchema.parse(newTask);
    }

    public read = async (): Promise<Array<returnTask>> => {
        const allTasks = await prisma.task.findMany({ include: {category: true}})

        return returnTaskSchema.array().parse(allTasks)

    }


}
