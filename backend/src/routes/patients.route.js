import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import patientsController from "../controllers/patients.controller.js";
import validate from "../validations/validate.validate.js";
import authSchema from "../validations/authSchema.validate.js";
import upload from "../middlewares/upload..middleware.js";

const patientsRoute = express.Router();

patientsRoute.use(authMiddleware.checkToken);
patientsRoute.use(authMiddleware.isRole("ADMIN"));

patientsRoute.get("/", patientsController.getAllPatient);
patientsRoute.get("/:patientId", patientsController.getPatientById);
patientsRoute.put(
  "/:patientId",
  // validate(authSchema.updatePatient),
  upload.single("profileImage"),
  patientsController.updatePatientById
);
patientsRoute.patch("/:patientId", patientsController.softDeletePatientById);

export default patientsRoute;
