import { fileURLToPath } from "url";

// ruta directorio.
export const __dirname = fileURLToPath(new URL('.', import.meta.url));

// authorization key.
const authKey = 'admin';

// estructura para mensajes
export const returnMessage = (isError, message, payload) => {
  return { status: isError ? "error" : "success", message, payload };
}

// verifica si es un objeto vacio
export const verifyEmptyObject = (obj) => {        
  return (obj == null) 
    ? true
    : Object.entries(obj).length === 0;
}

// obtiene el maximo id desde el objeto
export const getMaxId = (obj) => {
  return (!verifyEmptyObject(obj))
    ? obj.reduce((prev, curr) => {return (prev = prev > curr.id ? prev : curr.id);}, 0)
    : 0;
}

// middleware
export const authMiddleware = (req, res, next) => {
  req.header('authorization') == authKey
    ? next()
    : res.status(401).json(returnMessage(true, "Error -1: " + req.originalUrl + " no autorizado", null))
}