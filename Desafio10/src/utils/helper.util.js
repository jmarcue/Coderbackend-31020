import { join } from 'path';
import { fileURLToPath } from 'url';
import { inspect } from 'util';
import mongoose from "mongoose";

// ruta directorio.
const __dirname = fileURLToPath(new URL('.', import.meta.url));

const getMongoObjectId = mongoose.Types.ObjectId().toString();

const printObject = (object) => {
  console.log(inspect(object, false, 12, true));
}

// estructura para mensajes
const returnMessage = (isError, message, payload) => {
  return {
    status: isError ? "error" : "exitoso",
    message,
    payload
  };
}

// verifica si es un objeto vacio
const isEmptyObject = (obj) => {        
  return (obj == null) 
    ? true
    : Object.entries(obj).length === 0;
}

// obtiene el maximo id desde el objeto
const getMaxId = (obj) => {
  return (!isEmptyObject(obj))
    ? obj.reduce((prev, curr) => {return (prev = prev > curr.id ? prev : curr.id);}, 0)
    : 0;
}


const jsonTestData = {
  "id": 1,
  "mensajes": [
    {
      "id": "user1@gmail.com",
      "author": {
          "id": "user1@gmail.com",
          "nombre": "User Name",
          "apellido": "User Last Name",
          "alias": "User Alias",
          "edad": 30,
          "avatar": "User Url Avatar"
      },
      "text": {
          "id": "TextA",
          "mensaje": "Message 1"
      }
    },
    {
      "id": "user2@gmail.com",
      "author": {
          "id": "user2@gmail.com",
          "nombre": "User Name",
          "apellido": "User Last Name",
          "alias": "User Alias",
          "edad": 30,
          "avatar": "User Url Avatar"
      },
      "text": {
          "id": "TextB",
          "mensaje": "Message 2"
      }
    },
    {
      "id": "user1@gmail.com",
      "author": {
          "id": "user1@gmail.com",
          "nombre": "User Name",
          "apellido": "User Last Name",
          "alias": "User Alias",
          "edad": 30,
          "avatar": "User Url Avatar"
      },
      "text": {
          "id": "TextC",
          "mensaje": "Message 3"
      }
    },
    {
      "id": "user2@gmail.com",
      "author": {
          "id": "user2@gmail.com",
          "nombre": "User Name",
          "apellido": "User Last Name",
          "alias": "User Alias",
          "edad": 40,
          "avatar": "User Url Avatar"
      },
      "text": {
          "id": "TextD",
          "mensaje": "Message 4"
      }
    },
    {
      "id": "user2@gmail.com",
      "author": {
          "id": "user2@gmail.com",
          "nombre": "User Name",
          "apellido": "User Last Name",
          "alias": "User Alias",
          "edad": 40,
          "avatar": "User Url Avatar"
      },
      "text": {
          "id": "TextE",
          "mensaje": "Message 5"
      }
    },
    {
      "id": "user3@gmail.com",
      "author": {
          "id": "user3@gmail.com",
          "nombre": "User Name",
          "apellido": "User Last Name",
          "alias": "User Alias",
          "edad": 40,
          "avatar": "User Url Avatar"
      },
      "text": {
          "id": "TextF",
          "mensaje": "Message 6"
      }
    }
  ]
};

export { __dirname, join as __dirJoin, returnMessage, isEmptyObject, getMaxId, jsonTestData, printObject, getMongoObjectId}