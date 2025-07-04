import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import medicinesController from "../controllers/medicines.controller.js";
import validate from "../validations/validate.validate.js";
import authSchema from "../validations/authSchema.validate.js";

const medicinesRoute = express.Router();

medicinesRoute.use(authMiddleware.checkToken);
medicinesRoute.use(authMiddleware.isRole("ADMIN"));

medicinesRoute.get("/", medicinesController.getAllMedicines);
medicinesRoute.post(
  "/",
  validate(authSchema.createMedicine),
  medicinesController.createMedicine
);
medicinesRoute.put(
  "/:id",
  validate(authSchema.createMedicine),
  medicinesController.updateMedicineById
);
medicinesRoute.get("/:id", medicinesController.getMedicineById);

export default medicinesRoute;
