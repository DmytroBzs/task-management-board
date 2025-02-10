import { initMongoConnection } from './db/initMongoCollection';
import { setupServer } from './server';

const bootsrap = async () => {
  await initMongoConnection();
  setupServer();
};

bootsrap();
