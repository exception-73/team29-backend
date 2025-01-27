import express from "express";
import cors from "cors"
import dotenv from "dotenv";

import StockRouter from "./routes/StockRouter.js";
import ForexRouter from "./routes/ForexRouter.js";

dotenv.config();

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());
app.use(express.static("public"));

app.use("/api/v1/stocks", StockRouter);
app.use('/api/v1/forex', ForexRouter)

app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
});