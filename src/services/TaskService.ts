import { prisma } from "../database/prisma";
import { CreateTask, UpdateTask, Task, TaskWithCategory } from "../interfaces";

export class TaskService {

    public create = async (payload: CreateTask, userId: number): Promise<Task> => {

        const newTask = await prisma.task.create({
            data: {
                ...payload,
                userId
            } 
        });

        return newTask;
    }

    public read = async (search?: string): Promise<TaskWithCategory[] | null > => {

        if(search){
            const foundTasks = await prisma.task.findMany({
                where: {
                    ...(search && {
                        category: { name: search }
                    })
                },
                include: {
                    category: true
                }

            });
            return foundTasks;   
        }

        const tasks = await prisma.task.findMany({include: {category : true}});
    
        return tasks;
    }

    public retrieve = async (taskId: number): Promise<TaskWithCategory | null> => {

        const foundTask = await prisma.task.findFirst({ where: { id: taskId },
        include: {
            category: true
        } });

        return foundTask;
    }

    public update = async (taskId: number, data: UpdateTask): Promise<Task> => {

        const updateTask = await prisma.task.update({ where: { id: taskId },
             data });

        return updateTask;
    }

    public delete = async (taskId: number) => {

      const deleteTask = await prisma.task.delete({ where: { id: taskId } });
        
        return deleteTask;
    }
};
