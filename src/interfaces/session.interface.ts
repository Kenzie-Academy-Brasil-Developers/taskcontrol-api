import { z } from "zod";
import { sessionCreateSchema } from "../schemas";

type createSession = z.infer<typeof sessionCreateSchema>;
type returnSession = {
    token: string;
};

export { createSession, returnSession};