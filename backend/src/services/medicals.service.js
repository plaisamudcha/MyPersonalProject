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
          include: { appointments: { include: { medicalRecord: true } } },
        },
      },
    });
    return result.doctor.appointments.reduce((prev, curr) => {
      prev.push(curr.medicalRecord);
      return prev;
    }, []);
  },
  getMedicalRecordByPatientId: async (id) => {
    const result = await prisma.user.findUnique({
      where: { id: Number(id) },
      omit: { password: true, createdAt: true },
      include: {
        patient: {
          include: { appointments: { include: { medicalRecord: true } } },
        },
      },
    });
    return result.patient.appointments.reduce((prev, curr) => {
      prev.push(curr.medicalRecord);
      return prev;
    }, []);
  },
};

export default medicalsService;
