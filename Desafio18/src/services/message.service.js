import messagePersistence from '../persistences/message.persistence.js';
import { normalize, schema, denormalize } from 'normalizr';
import { logger } from '../utils/winston.util.js';

const dbMensaje = new messagePersistence();

async function addMsgService(data) {
    try {
        const mensaje = {
            author: {
                email: data.message.author.email,
                nombre: data.message.author.nombre,
                apellido: data.message.author.apellido,
                edad: data.message.author.edad,
                alias: data.message.author.alias,
                avatar: data.message.author.avatar
            },
        };
        mensaje.text = data.message.text;

        const newMsg = await dbMensaje.addMsgPersistence(mensaje);
        return newMsg;
    } catch (error) {
        logger.error.error(error);
    }
}

async function findAllMsgService() {
    try {
        const mensajes = await dbMensaje.findAllMsgPersistence();
        const id = 'mensajes';
        return (id, mensajes);
    } catch (error) {
        logger.error.error(error);
    }
}

async function normalizedDataService() {
    try {
        let mensajes = await dbMensaje.normalizedDataPersistence();

        let msgOriginal = {
            id: 'mensajes',
            mensajes: mensajes.map(mensaje => ({ ...mensaje._doc }))
        }

        const schemaAuthor = new schema.Entity('author', {}, { idAttribute: 'email' });
        const schemaMensaje = new schema.Entity('mensaje', {
            author: schemaAuthor
        }, { idAttribute: '_id' })

        const schemaMensajes = new schema.Entity('mensajes', {
            mensajes: [schemaMensaje]
        }, { idAttribute: 'id' })

        let normalizedData = normalize(msgOriginal, schemaMensajes);

        return normalizedData;

    } catch (error) {
        logger.error.error(error);
    }

}

export {
  addMsgService,
  findAllMsgService,
  normalizedDataService
}