import { mongoose } from "mongoose";
import { loadEnv } from "../utils/load-env.mjs";
export async function connect() {
  loadEnv()
  const state = mongoose.connection.readyState;
  if (state != 1) { // not connected
    const { MONGO_ROOT_USERNAME, MONGO_ROOT_PASSWORD, MONGO_DB_PORT, MONGO_DB_NAME } = process.env
    const cluster = `localhost:${MONGO_DB_PORT}/${MONGO_DB_NAME}?authSource=admin`
    const dbServer = `mongodb://${MONGO_ROOT_USERNAME}:${MONGO_ROOT_PASSWORD}@${cluster}`
    return mongoose
      .connect(dbServer)
      .then(() => {
        console.info('connected OK')
        return mongoose.connection.readyState
      }) // 0 => disconnected, 1 => connected, 2 => Connecting, 3 => disconnecting
      .catch((err) => console.error("DB KO", err));
  }

  return state;
}