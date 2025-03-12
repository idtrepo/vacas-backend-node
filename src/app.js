import express from "express";
import morgan from "morgan";
import cors from "cors";

const app = express();

app.disable("x-powered-by");
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(express.static("public"));

app.get("*", (req, res) => {
  const indexPath = join(import.meta.dirname, "..", "/public", "index.html");

  res.sendFile(indexPath);
});

export default app;
