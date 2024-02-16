import express, { Application, json } from "express";
import helmet from "helmet";
import { categoryRouter } from "./routers/category.router";
import { handleErrors } from "./middlewares/handleErrors.middleware";


export const app: Application = express();

app.use(helmet());
app.use(json());

app.use("/api/categories", categoryRouter);


app.use(handleErrors);