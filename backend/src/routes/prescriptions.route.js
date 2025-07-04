import express from "express";
import prescriptionsController from "../controllers/prescription.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import validate from "../validations/validate.validate.js";
import authSchema from "../validations/authSchema.validate.js";

const prescriptionsRoute = express.Router();

prescriptionsRoute.use(authMiddleware.checkToken);

prescriptionsRoute.get(
  "/",
  authMiddleware.isRole("ADMIN"),
  prescriptionsController.getAllPrescriptions
);
prescriptionsRoute.post(
  "/",
  authMiddleware.isRole("DOCTOR"),
  validate(authSchema.createPrescription),
  prescriptionsController.createPrescription
);
prescriptionsRoute.get(
  "/doctors",
  authMiddleware.isRole("DOCTOR"),
  prescriptionsController.getPrescriptionByDoctorId
);
prescriptionsRoute.get(
  "/:id",
  authMiddleware.isRole("ADMIN"),
  prescriptionsController.getPrescriptionById
);
prescriptionsRoute.delete(
  "/:id",
  authMiddleware.isRole("DOCTOR"),
  prescriptionsController.deletePrescriptionById
);

export default prescriptionsRoute;
