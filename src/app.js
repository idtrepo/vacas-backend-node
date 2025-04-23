import morgan from 'morgan'
import express from 'express'
import { join } from 'node:path'
import { AppRouter } from "./routes/index.js";
import { CORSMiddleware } from "./middlewares/cors.js";
import { QueryMiddleware } from "./middlewares/query.js";
import { AutenticacionMiddleware } from "./middlewares/autenticacion.js";
import { PaginacionMiddleware } from "./middlewares/paginacion.js";
import { AutorizacionMiddleware } from "./middlewares/autorizacion.js";

const staticPath = join(import.meta.dirname, '/views');
const app = express();

app.use(CORSMiddleware.execute())
app.use(express.json());
app.use(morgan('dev'));
app.use(AutenticacionMiddleware.execute);
app.use(AutorizacionMiddleware.execute);
 app.use(QueryMiddleware.execute);
app.use(PaginacionMiddleware.execute);


app.use("/api", AppRouter.routes);

export default app;