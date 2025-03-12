import z from "zod";
import dotenv from "dotenv";
import { SettingsDTO } from "../dto/settings.js";

dotenv.config();

const SettingsSchema = z.object({
  PORT: z.string().default("8001"),
});

const { data, error } = SettingsSchema.safeParse(process.env);

if (error) {
  console.error("Ha ocurrido un error al cargar las variables de entorno");
  process.exit(1);
}

export default SettingsDTO.parse(data);
