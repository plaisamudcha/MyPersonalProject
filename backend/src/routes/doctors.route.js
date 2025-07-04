import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import doctorsController from "../controllers/doctors.controller.js";
import validate from "../validations/validate.validate.js";
import authSchema from "../validations/authSchema.validate.js";
import upload from "../middlewares/upload..middleware.js";

const doctorsRoute = express.Router();

doctorsRoute.use(authMiddleware.checkToken);
doctorsRoute.use(authMiddleware.isRole("ADMIN"));

doctorsRoute.get("/", doctorsController.getAllDoctors);
doctorsRoute.get("/:doctorId", doctorsController.getDoctorById);
doctorsRoute.put(
  "/:doctorId",
  // validate(authSchema.updateDoctor),
  upload.single("profileImage"),
  doctorsController.updateDoctorById
);
doctorsRoute.patch("/:doctorId", doctorsController.softDeleteDoctorById);

export default doctorsRoute;
