import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import medicalsController from "../controllers/medicals.controller.js";
import validate from "../validations/validate.validate.js";
import authSchema from "../validations/authSchema.validate.js";

const medicalsRoute = express.Router();

medicalsRoute.use(authMiddleware.checkToken);

medicalsRoute.get(
  "/",
  authMiddleware.isRole("ADMIN"),
  medicalsController.getAllMedicalRecords
);
medicalsRoute.post(
  "/",
  authMiddleware.isRole("DOCTOR"),
  validate(authSchema.createMedicalRecord),
  medicalsController.createMedicalRecord
);
medicalsRoute.get(
  "/doctors",
  authMiddleware.isRole("DOCTOR"),
  medicalsController.getMedicalRecordByDoctorId
);
medicalsRoute.get(
  "/patients",
  authMiddleware.isRole("PATIENT"),
  medicalsController.getMedicalRecordByPatientId
);
medicalsRoute.get(
  "/:id",
  authMiddleware.isRole("ADMIN"),
  medicalsController.getMedicalRecord
);

export default medicalsRoute;
