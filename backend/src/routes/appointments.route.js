import express from "express";
import appointmentsController from "../controllers/appointments.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import validate from "../validations/validate.validate.js";
import authSchema from "../validations/authSchema.validate.js";

const appointmentsRoute = express.Router();

appointmentsRoute.use(authMiddleware.checkToken);

appointmentsRoute.get(
  "/",
  authMiddleware.isRole("ADMIN"),
  appointmentsController.getAllAppointments
);
appointmentsRoute.post(
  "/",
  validate(authSchema.createAppointment),
  authMiddleware.isRole("ADMIN"),
  appointmentsController.createAppointment
);
appointmentsRoute.get(
  "/doctors",
  authMiddleware.isRole("DOCTOR"),
  appointmentsController.getAppointmentByDoctorId
);
appointmentsRoute.get(
  "/patients",
  authMiddleware.isRole("PATIENT"),
  appointmentsController.getAppointmentByPatientId
);
appointmentsRoute.get(
  "/:id",
  authMiddleware.isRole("ADMIN"),
  appointmentsController.getAppointmentById
);
appointmentsRoute.delete(
  "/:id",
  authMiddleware.isRole("ADMIN"),
  appointmentsController.deleteAppointmentById
);
appointmentsRoute.put(
  "/:id",
  validate(authSchema.createAppointment),
  authMiddleware.isRole("ADMIN"),
  appointmentsController.updateAppointmentById
);
appointmentsRoute.patch(
  "/:id",
  validate(authSchema.patchAppointment),
  authMiddleware.isRole(["ADMIN", "DOCTOR"]),
  appointmentsController.pathAppointmentById
);

export default appointmentsRoute;
