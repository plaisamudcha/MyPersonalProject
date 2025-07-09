import prisma from "../config/prisma.js";

const medicalsService = {
  getAllMedicalRecords: async () => {
    return await prisma.medicalRecord.findMany();
  },
  getMedicalRecord: async (id) => {
    return await prisma.medicalRecord.findUnique({
      where: { id: Number(id) },
    });
  },
  createMedicalRecord: async (diagnosis, notes, appointmentId) => {
    return await prisma.medicalRecord.create({
      data: { diagnosis, notes, appointmentId: Number(appointmentId) },
    });
  },
  findByAppointmentId: async (id) => {
    return await prisma.medicalRecord.findUnique({
      where: { appointmentId: Number(id) },
    });
  },
  getMedicalRecordByDoctorId: async (id) => {
    const result = await prisma.user.findUnique({
      where: { id: Number(id) },
      omit: { password: true, createdAt: true },
      include: {
        doctor: {
          include: {
            appointments: {
              include: {
                medicalRecord: true,
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
        id: item.medicalRecord?.id || "-",
        diagnosis: item.medicalRecord?.diagnosis || "-",
        notes: item.medicalRecord?.notes || "-",
        createdAt: item.medicalRecord?.createdAt || "-",
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
  getMedicalRecordByPatientId: async (id, patientId) => {
    const result = await prisma.user.findUnique({
      where: { id: Number(id) },
      omit: { password: true, createdAt: true },
      include: {
        doctor: {
          include: {
            appointments: {
              where: { patientId: Number(patientId) },
              include: {
                medicalRecord: { include: { prescription: true } },
                patient: {
                  omit: { userId: true, deletedAt: true },
                  include: {
                    user: { select: { firstName: true, lastName: true } },
                  },
                },
              },
            },
          },
        },
      },
    });
    return result.doctor.appointments.reduce((prev, curr, index) => {
      if (index === 0) {
        prev["id"] = curr.patient.id;
        prev["dob"] = curr.patient.dob;
        prev["gender"] = curr.patient.gender;
        prev["phone"] = curr.patient.phone;
        prev["profileImage"] = curr.patient.profileImage;
        prev["firstName"] = curr.patient.user.firstName;
        prev["lastName"] = curr.patient.user.lastName;
        prev["medicalRecord"] = [];
      }
      if (curr.medicalRecord) {
        prev["medicalRecord"].push(curr.medicalRecord);
      }
      return prev;
    }, {});
  },
};

export default medicalsService;
