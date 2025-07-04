import prisma from "../config/prisma.js";

const doctorsService = {
  getAllDoctors: async () => {
    return await prisma.doctor.findMany({
      where: { deletedAt: null },
      omit: { userId: true },
      include: {
        user: { omit: { password: true } },
      },
    });
  },
  getDoctorById: async (id) => {
    return await prisma.doctor.findUnique({
      where: { id: Number(id) },
      include: {
        user: { omit: { password: true } },
      },
    });
  },
  updateDoctorById: async (
    id,
    firstName,
    lastName,
    email,
    specialization,
    profileImage
  ) => {
    return await prisma.doctor.update({
      where: { id: Number(id) },
      data: {
        specialization,
        profileImage,
        user: { update: { firstName, lastName, email } },
      },
    });
  },
  softDeleteDoctorById: async (id) => {
    return await prisma.doctor.update({
      where: { id: Number(id) },
      data: { deletedAt: new Date() },
    });
  },
};

export default doctorsService;
