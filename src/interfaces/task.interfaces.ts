import { z } from "zod";
import { createTaskSchema, returnTaskSchema, updateTaskSchema } from "../schemas";

type createTask = z.infer<typeof createTaskSchema>;
type updateTask = z.infer<typeof updateTaskSchema>;
type returnTask = z.infer<typeof returnTaskSchema>;

export { createTask, updateTask, returnTask }