import express from "express";
import { ExchangeRate } from "../controllers/forex/ExchangeRates.js";
import { WeeklyData } from "../controllers/forex/WeeklyRates.js";
import { DailyData } from "../controllers/forex/DailyRates.js";
import { MonthlyData } from "../controllers/forex/MontlyRates.js";
const ForexRouter = express.Router();


ForexRouter.get("/exchange-rate", ExchangeRate);
ForexRouter.get('/montly', MonthlyData);
ForexRouter.get('/weekly', WeeklyData);
ForexRouter.get('/daily', DailyData);


export default ForexRouter;