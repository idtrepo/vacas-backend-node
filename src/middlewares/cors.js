import cors from "cors";

const TODOS = ["*"];

export class CORSMiddleware {
  static execute = ({ origenes = TODOS } = {}) => {
    if (origenes === TODOS) return cors();
    return cors({
      origin: (origin, callback) => {
        if (origenes.includes(origin) || !origin) return callback(null, true);

        return callback(new Error("Erro de CORS"));
      },
    });
  };
}
