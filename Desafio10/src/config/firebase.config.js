import { readFile } from 'fs/promises';
import admin from 'firebase-admin';

const firebaseAccountCredentials = JSON.parse(await readFile(new URL('./firebase.key.json', import.meta.url)));

admin.initializeApp({
  credential: admin.credential.cert(firebaseAccountCredentials)
});

const db = admin.firestore();
const fieldValue = admin.firestore.FieldValue;
const queryProduct = db.collection('products');
const queryMessage = db.collection('messages');

export { queryProduct, queryMessage, fieldValue }