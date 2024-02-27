import { z } from "zod";
import { userSchema } from "./user.schema";


const sessionCreateSchema = userSchema.omit({id: true});

export { sessionCreateSchema };