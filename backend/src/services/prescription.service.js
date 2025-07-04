import prisma from "../config/prisma.js";

const prescriptionsService = {
  getAllPrescriptions: async () => {
    return await prisma.prescription.findMany();
  },
  getPrescriptionById: async (id) => {
    return await prisma.prescription.findUnique({ where: { id: Number(id) } });
  },
  createPrescription: async (dosage, duration, medicalRecordId, medicineId) => {
    return await prisma.prescription.create({
      data: {
        dosage,
        duration,
        medicalRecordId,
        medicineId,
      },
    });
  },
  getPrescriptionByDoctorId: async (id) => {
    const result = await prisma.user.findUnique({
      where: { id: Number(id) },
      include: {
        doctor: {
          include: {
            appointments: {
              include: { medicalRecord: { include: { prescription: true } } },
            },
          },
        },
      },
    });
    return result.doctor.appointments.reduce((prev, curr) => {
      prev.push(curr.medicalRecord.prescription);
      return prev;
    }, []);
  },
  deletePrescriptionById: async (id) => {
    return await prisma.prescription.delete({ where: { id: Number(id) } });
  },
};

export default prescriptionsService;
