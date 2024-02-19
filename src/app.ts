import express, { Application, json } from "express";
import helmet from "helmet";
import "express-async-errors";
import { handleErrors } from "./middlewares/handleErrors.middleware";
import { taskRouter, categoryRouter } from "./routers";


export const app: Application = express();

app.use(helmet());
app.use(json());


app.use("/api/tasks", taskRouter);
app.use("/api/categories", categoryRouter);


app.use(handleErrors);