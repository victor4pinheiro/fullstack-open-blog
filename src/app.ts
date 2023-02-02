import express from "express";
import router from "./routes";
import { handleError, unknownEndpoint } from "./middleware/handleErrors";
import morgan from "morgan";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));
app.use(router);
app.use(handleError);
app.use(unknownEndpoint);

export default app;
