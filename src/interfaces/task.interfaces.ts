import { z } from "zod";
import { createTaskSchema, returnTaskSchema, taskSchema, updateTaskSchema } from "../schemas";

type Task = z.infer<typeof taskSchema>
type createTask = z.infer<typeof createTaskSchema>;
type updateTask = z.infer<typeof updateTaskSchema>;
type returnTask = z.infer<typeof returnTaskSchema>;

export { createTask, updateTask, returnTask, Task }