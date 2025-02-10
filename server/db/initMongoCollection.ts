import mongoose from 'mongoose';
import { getEnvVar } from '../utils/getEnvVar';

export const initMongoConnection = async () => {
  try {
    const user = getEnvVar('MONGODB_USER');
    const password = getEnvVar('MONGODB_PASSWORD');
    const url = getEnvVar('MONGODB_URL');
    const db = getEnvVar('MONGODB_DB');

    await mongoose.connect(`mongodb+srv://${user}:${password}@${url}/${db}`);
    console.log('Mongo connection successfully established!');
  } catch (error) {
    console.log('Error while setting up mongo connection', error);
    throw error;
  }
};
