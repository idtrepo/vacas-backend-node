import dotenv from 'dotenv'
import { SettingsDTO } from "../src/dtos/settings.js";
import { evaluarSettings } from "../src/schemas/settings.js";

dotenv.config();

const { error, data } = evaluarSettings(process.env);

if (error) {
  console.error("Ocurrio un error con las variables de entorno");
  process.exit(1);
}

export const { PORT, TOKEN_ACCESS_TIME, TOKEN_REFRESH_TIME, TOKEN_SECRET_KEY } =
  SettingsDTO.parse(data);