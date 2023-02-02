import mongoose from "mongoose";
import { MONGODB_URI } from "../utils/config";

class Database {
  static async connect() {
    if (!MONGODB_URI) return null;
    const client = await mongoose.connect(MONGODB_URI);
    return client.connection;
  }

  static async disconnecting() {
    await mongoose.disconnect();
  }
}

export default Database;
