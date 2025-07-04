import prisma from "../config/prisma.js";
import bcrypt from "bcryptjs";

const authService = {
  findExistUser: async (email) => {
    return await prisma.user.findUnique({ where: { email } });
  },
  registerPatient: async (
    firstName,
    lastName,
    email,
    password,
    dob,
    gender,
    phone
  ) => {
    const hashPassword = await bcrypt.hash(password, 12);
    return await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashPassword,
        role: "PATIENT",
        patient: { create: { dob: new Date(dob), gender, phone } },
      },
    });
  },
  registerDoctor: async (
    firstName,
    lastName,
    email,
    password,
    specialization
  ) => {
    const hashPassword = await bcrypt.hash(password, 12);
    return await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashPassword,
        role: "DOCTOR",
        doctor: { create: { specialization } },
      },
    });
  },
  loginUser: async (email, password) => {
    const patient = await prisma.user.findUnique({ where: { email } });
    if (!patient) return null;
    const isMatch = await bcrypt.compare(password, patient.password);
    return isMatch ? patient : null;
  },
  getDoctor: async (id) => {
    return await prisma.user.findUnique({
      where: { id: Number(id) },
      omit: { password: true },
      include: { doctor: true },
    });
  },
  getPatient: async (id) => {
    return await prisma.user.findUnique({
      where: { id: Number(id) },
      omit: { password: true },
      include: { patient: true },
    });
  },
  resetPassword: async (id, newPassword) => {
    const hashPassword = await bcrypt.hash(newPassword, 12);
    return await prisma.user.update({
      where: { id: Number(id) },
      data: { password: hashPassword },
    });
  },
  getDoctors: async () => {
    return await prisma.user.findMany({
      where: { role: "DOCTOR" },
      omit: {
        role: true,
        id: true,
        email: true,
        password: true,
        createdAt: true,
      },
      include: {
        doctor: { omit: { id: true, userId: true, deletedAt: true } },
      },
    });
  },
};

export default authService;
