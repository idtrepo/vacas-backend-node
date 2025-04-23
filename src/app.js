import express from "express";
import morgan from "morgan";
import cors from "cors";
import { AppRouter } from "./routes/index.js";

const app = express();

app.disable("x-powered-by");
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(express.static("public"));

app.use("/api", AppRouter.routes);


export default app;
