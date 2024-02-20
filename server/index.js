import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import chatRoutes from "./routes/chatRoutes.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());
dotenv.config();

app.use("/", chatRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
