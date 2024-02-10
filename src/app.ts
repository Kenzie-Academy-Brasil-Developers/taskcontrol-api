import express, { Application, json } from "express";
import helmet from "helmet";


export const app: Application = express();

app.use(helmet());
app.use(json());