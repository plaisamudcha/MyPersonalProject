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
      const { password: hashPassword, ...user } = foundUser;
      res.json({
        message: `Login success, Welcome back ${foundUser.firstName} ${foundUser.lastName}`,
        accessToken,
        user,
      });
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
};

export default authController;
