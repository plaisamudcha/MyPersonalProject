import prisma from "../config/prisma.js";

const patientsService = {
  getAllPatients: async () => {
    return await prisma.patient.findMany({
      where: { deletedAt: null },
      omit: { userId: true },
      include: {
        user: { omit: { password: true } },
      },
    });
  },
  getPatientById: async (id) => {
    return await prisma.patient.findUnique({
      where: { id: Number(id) },
      include: {
        user: { omit: { password: true } },
      },
    });
  },
  updatePatientById: async (
    id,
    firstName,
    lastName,
    email,
    phone,
    profileImage
  ) => {
    return await prisma.patient.update({
      where: { id: Number(id) },
      data: {
        phone,
        profileImage,
        user: { update: { firstName, lastName, email } },
      },
    });
  },
  softDeletePatientById: async (id) => {
    return await prisma.patient.update({
      where: { id: Number(id) },
      data: { deletedAt: new Date() },
    });
  },
};

export default patientsService;
