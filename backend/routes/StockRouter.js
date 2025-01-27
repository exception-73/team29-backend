import express from "express";

import { MontlyData } from "../controllers/stocks/MontlyData.js";
import { IntradayData } from "../controllers/stocks/IntradayData.js";
import { WeeklyData } from "../controllers/stocks/WeeklyData.js";
import { DailyData } from "../controllers/stocks/DailyData.js";
const StockRouter = express.Router();

//MONTHLY DATA
StockRouter.get('/montly', MontlyData);
StockRouter.get('/intraday', IntradayData);
StockRouter.get('/weekly', WeeklyData );
StockRouter.get('/daily', DailyData);

export default StockRouter;