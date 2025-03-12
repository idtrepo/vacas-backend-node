import app from "./app.js";
import settings from "./settings/index.js";

app.listen(settings.PORT, () => {
  console.log(`Servidor escuchando en: http://localhost:${settings.PORT}`);
});
