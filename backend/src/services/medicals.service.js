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
  getMedicalRecordByDoctorId: async (id, page, limit, name = "") => {
    const [total, medicalRecords] = await Promise.all([
      prisma.medicalRecord.count({
        where: {
          AND: [
            { appointment: { doctor: { user: { id: Number(id) } } } },
            {
              appointment: {
                patient: {
                  user: {
                    OR: [
                      { firstName: { contains: name } },
                      { lastName: { contains: name } },
                    ],
                  },
                },
              },
            },
          ],
        },
      }),
      prisma.medicalRecord.findMany({
        where: {
          AND: [
            { appointment: { doctor: { user: { id: Number(id) } } } },
            {
              appointment: {
                patient: {
                  user: {
                    OR: [
                      { firstName: { contains: name } },
                      { lastName: { contains: name } },
                    ],
                  },
                },
              },
            },
          ],
        },
        include: {
          appointment: {
            include: {
              patient: {
                include: {
                  user: { select: { firstName: true, lastName: true } },
                },
              },
            },
          },
        },
        orderBy: { id: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
    ]);
    return { total, medicalRecords };
  },
  getMedicalRecordByPatientId: async (id, patientId) => {
    const result = await prisma.medicalRecord.findMany({
      where: {
        AND: [
          { appointment: { doctor: { userId: Number(id) } } },
          { appointment: { patientId: Number(patientId) } },
        ],
      },
      include: {
        appointment: {
          include: {
            patient: {
              include: {
                user: { select: { firstName: true, lastName: true } },
              },
            },
          },
        },
        prescription: true,
      },
    });
    return result.reduce((prev, curr, idx) => {
      if (idx === 0) {
        prev["patient"] = curr.appointment.patient;
        prev["medicalRecord"] = [];
      }
      prev["medicalRecord"].push(curr);
      return prev;
    }, {});
  },
};

export default medicalsService;
