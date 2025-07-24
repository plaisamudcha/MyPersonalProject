import prisma from "../config/prisma.js";
import authService from "../services/auth.service.js";
import createError from "../utils/create-error.util.js";
import genTokenJWT from "../utils/jwt.util.js";
import sendResetEmail from "../utils/reset-email.js";

const authController = {
  registerPatient: async (req, res, next) => {
    try {
      const { firstName, lastName, email, password, dob, gender, phone } =
        req.body;
      const patient = await authService.findExistUser(email);
      if (patient) createError(400, "Email has already exist");
      const newPatient = await authService.registerPatient(
        firstName,
        lastName,
        email,
        password,
        dob,
        gender,
        phone
      );
      res.json({
        message: `Register success, Welcome ${newPatient.firstName} ${newPatient.lastName}`,
      });
    } catch (error) {
      next(error);
    }
  },
  registerDoctor: async (req, res, next) => {
    try {
      const { firstName, lastName, email, password, specialization } = req.body;
      const doctor = await authService.findExistUser(email);
      if (doctor) createError(400, "Email has already exist");
      const newDoctor = await authService.registerDoctor(
        firstName,
        lastName,
        email,
        password,
        specialization
      );
      res.json({
        message: `Register success, Welcome ${newDoctor.firstName} ${newDoctor.lastName}`,
      });
    } catch (error) {
      next(error);
    }
  },
  loginUser: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const foundUser = await authService.loginUser(email, password);
      console.log(foundUser);
      if (!foundUser) createError(400, "Invalid email or password");
      const payload = {
        id:
          foundUser.role === "PATIENT"
            ? foundUser.patient?.id
            : foundUser.role === "DOCTOR"
            ? foundUser.id
            : foundUser.id,
        role: foundUser.role,
      };
      const accessToken = genTokenJWT.loginToken(payload);
      const refreshToken = genTokenJWT.refreshToken(payload);
      await prisma.refreshToken.create({
        data: {
          token: refreshToken,
          userId: foundUser.id,
          expiresAt: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
        },
      });
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "strict",
        secure: true,
        maxAge: 60 * 24 * 60 * 60 * 1000,
      });
      const { password: hashPassword, ...user } = foundUser;

      res.json({ accessToken, user });
    } catch (error) {
      next(error);
    }
  },
  forgotPassword: async (req, res, next) => {
    try {
      const { email } = req.body;
      const user = await authService.findExistUser(email);
      if (!user) createError(400, "Invalid Email");
      const payload = { id: user.id, role: user.role };
      const token = genTokenJWT.forgotPasswordToken(payload);
      await sendResetEmail(user, token);

      res.json({ message: "Reset password sent to your email" });
    } catch (error) {
      next(error);
    }
  },
  resetPassword: async (req, res, next) => {
    try {
      const { token } = req.params;
      const { password } = req.body;
      const payload = genTokenJWT.checkResetPasswordToken(token);
      const user = await authService.getMe(payload.id);
      if (!user) createError(401, "Invalid token");
      await authService.resetPassword(payload.id, password);
      res.json({ message: "Reset password success" });
    } catch (error) {
      next(error);
    }
  },
  getDoctors: async (req, res, next) => {
    try {
      const doctors = await authService.getDoctors();
      res.json({ doctors });
    } catch (error) {
      next(error);
    }
  },
  refreshToken: async (req, res, next) => {
    try {
      const { refreshToken } = req.cookies;
      if (!refreshToken) createError(401, "Refresh token is missing");
      const refresh = await prisma.refreshToken.findUnique({
        where: { token: refreshToken },
        include: { User: true },
      });
      if (!refresh) createError(401, "Invalid refresh token");
      let userId = refresh?.userId;
      if (new Date() > new Date(refresh.expiresAt)) {
        await prisma.refreshToken.delete({ where: { token: refreshToken } });
        res.clearCookie("refreshToken");
        createError(401, "Refresh token has expired");
      }
      const newRefreshToken = genTokenJWT.refreshToken({
        id: userId,
        role: refresh.User.role,
      });
      const newAccessToken = genTokenJWT.loginToken({
        id: userId,
        role: refresh.User.role,
      });
      await prisma.refreshToken.update({
        where: { token: refreshToken },
        data: {
          token: newRefreshToken,
          expiresAt: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
        },
      });
      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        sameSite: "strict",
        secure: true,
        maxAge: 60 * 24 * 60 * 60 * 1000,
      });
      res.json({ accessToken: newAccessToken });
    } catch (error) {
      next(error);
    }
  },
};

export default authController;
