import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import medicinesController from "../controllers/medicines.controller.js";
import validate from "../validations/validate.validate.js";
import authSchema from "../validations/authSchema.validate.js";

const medicinesRoute = express.Router();

medicinesRoute.use(authMiddleware.checkToken);
// medicinesRoute.use(authMiddleware.isRole("ADMIN"));

medicinesRoute.get(
  "/",
  authMiddleware.isRole(["ADMIN", "DOCTOR"]),
  medicinesController.getAllMedicines
);
medicinesRoute.post(
  "/",
  authMiddleware.isRole("ADMIN"),
  validate(authSchema.createMedicine),
  medicinesController.createMedicine
);
medicinesRoute.put(
  "/:id",
  authMiddleware.isRole("ADMIN"),
  validate(authSchema.createMedicine),
  medicinesController.updateMedicineById
);
medicinesRoute.get(
  "/:id",
  authMiddleware.isRole("ADMIN"),
  medicinesController.getMedicineById
);

export default medicinesRoute;
