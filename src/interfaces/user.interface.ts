import { z } from "zod";
import { userSchema, userCreateSchema, userReturnSchema } from "../schemas";

type TUser = z.infer<typeof userSchema>;
type TUserCreate = z.infer<typeof userCreateSchema>;
type TUserReturn = z.infer<typeof userReturnSchema>;

export { TUser, TUserCreate, TUserReturn};