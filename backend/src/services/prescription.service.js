import prisma from "../config/prisma.js";

const prescriptionsService = {
  getAllPrescriptions: async (id) => {
    const result = await prisma.appointment.findUnique({
      where: { id: Number(id) },
      include: {
        payment: true,
        medicalRecord: {
          include: {
            prescription: {
              include: {
                medicine: {
                  omit: { stock: true, form: true, description: true },
                  include: { pharmacyStockLog: true },
                },
              },
            },
          },
        },
        patient: {
          include: {
            user: { select: { firstName: true, lastName: true } },
            payment: true,
          },
        },
      },
    });
    return result;
  },
  getPrescriptionByDoctorId: async (id) => {
    const result = await prisma.user.findUnique({
      where: { id: Number(id) },
      include: {
        doctor: {
          include: {
            appointments: {
              include: {
                medicalRecord: {
                  include: {
                    prescription: {
                      include: { medicine: { select: { name: true } } },
                    },
                  },
                },
                patient: {
                  omit: { id: true, userId: true, deletedAt: true },
                  include: {
                    user: { select: { firstName: true, lastName: true } },
                  },
                },
              },
              orderBy: { date: "desc" },
            },
          },
        },
      },
    });
    return result.doctor.appointments.map((item) => ({
      medicalRecord: {
        prescriptions: item.medicalRecord?.prescription ?? [],
        patient: {
          dob: item.patient.dob,
          gender: item.patient.gender,
          phone: item.patient.phone,
          profileImage: item.patient.profileImage,
          firstName: item.patient.user.firstName,
          lastName: item.patient.user.lastName,
        },
      },
    }));
  },
  deletePrescriptionById: async (id) => {
    return await prisma.prescription.delete({ where: { id: Number(id) } });
  },
  createPrescription: async (dosage, duration, medicalRecordId, medicineId) => {
    return await prisma.prescription.create({
      data: { dosage, duration, medicalRecordId, medicineId },
    });
  },
  updateStatusPrescription: async (id, createStock) => {
    return prisma.prescription.update({
      where: { id: Number(id) },
      data: { createStock },
    });
  },
};

export default prescriptionsService;
