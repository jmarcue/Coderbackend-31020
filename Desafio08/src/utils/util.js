import { fileURLToPath } from "url";

// ruta directorio.
export const __dirname = fileURLToPath(new URL('.', import.meta.url));

// estructura para mensajes
export const returnMessage = (isError, message, payload) => {
  return { status: isError ? "error" : "success", message, payload };
}