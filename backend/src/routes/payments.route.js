import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import paymentsController from "../controllers/payments.controller.js";
import validate from "../validations/validate.validate.js";
import authSchema from "../validations/authSchema.validate.js";

const paymentsRoute = express.Router();

paymentsRoute.use(authMiddleware.checkToken);

paymentsRoute.get(
  "/",
  authMiddleware.isRole("ADMIN"),
  paymentsController.getAllPayments
);
paymentsRoute.post(
  "/",
  authMiddleware.isRole("ADMIN"),
  validate(authSchema.createPayment),
  paymentsController.createPayment
);
paymentsRoute.get(
  "/appointment/:appointmentId",
  authMiddleware.isRole("ADMIN"),
  paymentsController.getPaymentByAppointmentId
);
paymentsRoute.get(
  "/patients",
  authMiddleware.isRole("PATIENT"),
  paymentsController.getPaymentByPatientId
);
paymentsRoute.patch(
  "/:id",
  authMiddleware.isRole("ADMIN"),
  validate(authSchema.updatePayment),
  paymentsController.updatePayment
);
paymentsRoute.get(
  "/:id",
  authMiddleware.isRole("ADMIN"),
  paymentsController.getPaymentById
);

export default paymentsRoute;
