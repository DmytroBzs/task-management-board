import { initMongoConnection } from "./src/db/initMongoCollection";
import { setupServer } from "./server";

const bootstrap = async () => {
  await initMongoConnection();
  setupServer();
};

bootstrap();
