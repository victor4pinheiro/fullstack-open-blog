import dotenv from "dotenv";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT;
const SECRET = process.env.SECRET || "teste";

export { PORT, MONGODB_URI, SECRET };
