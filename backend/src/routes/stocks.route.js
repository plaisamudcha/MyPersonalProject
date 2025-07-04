import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import stocksController from "../controllers/stocklogs.controller.js";
import validate from "../validations/validate.validate.js";
import authSchema from "../validations/authSchema.validate.js";

const stocksRoute = express.Router();

stocksRoute.use(authMiddleware.checkToken);
stocksRoute.use(authMiddleware.isRole("ADMIN"));

stocksRoute.get("/", stocksController.getAllStocks);
stocksRoute.get("/medicine/:id", stocksController.getStocksByMedicineId);
stocksRoute.post(
  "/",
  validate(authSchema.createStock),
  stocksController.createStock
);

export default stocksRoute;
