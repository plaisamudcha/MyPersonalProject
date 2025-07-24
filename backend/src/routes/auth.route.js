import express from "express";
import authController from "../controllers/auth.controller.js";
import authSchema from "../validations/authSchema.validate.js";
import validate from "../validations/validate.validate.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const authRoute = express.Router();

authRoute.post(
  "/register/patient",
  validate(authSchema.registerPatient),
  authController.registerPatient
);
authRoute.post(
  "/register/doctor",
  authMiddleware.checkToken,
  authMiddleware.isRole("ADMIN"),
  validate(authSchema.registerDoctor),
  authController.registerDoctor
);
authRoute.post(
  "/login",
  validate(authSchema.loginUser),
  authController.loginUser
);
authRoute.post(
  "/forgot-password",
  validate(authSchema.forgotPassword),
  authController.forgotPassword
);
authRoute.post(
  "/reset-password/:token",
  validate(authSchema.resetPasswordUser),
  authController.resetPassword
);
authRoute.get("/publicDoctor", authController.getDoctors);

authRoute.get("/refreshToken", authController.refreshToken);

export default authRoute;
