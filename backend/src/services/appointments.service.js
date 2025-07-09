import prisma from "../config/prisma.js";

const appointmentsService = {
  getAllAppointments: async () => {
    const result = await prisma.appointment.findMany({
      omit: { doctorId: true, patientId: true, updatedAt: true },
      orderBy: { date: "desc" },
      include: {
        doctor: {
          omit: { userId: true, profileImage: true, deletedAt: true },
          include: {
            user: {
              omit: {
                id: true,
                password: true,
                role: true,
                createdAt: true,
                email: true,
              },
            },
          },
        },
        patient: {
          omit: {
            userId: true,
            deletedAt: true,
            dob: true,
            gender: true,
            phone: true,
            profileImage: true,
          },
          include: {
            user: {
              omit: {
                id: true,
                email: true,
                password: true,
                role: true,
                createdAt: true,
              },
            },
          },
        },
      },
    });
    return result.reduce((prev, curr) => {
      let newObj = {
        id: curr.id,
        date: curr.date,
        time: curr.time,
        status: curr.status,
        doctor: {
          id: curr.doctor.id,
          specialization: curr.doctor.specialization,
          firstName: curr.doctor.user.firstName,
          lastName: curr.doctor.user.lastName,
        },
        patient: {
          id: curr.patient.id,
          firstName: curr.patient.user.firstName,
          lastName: curr.patient.user.lastName,
        },
      };
      prev.push(newObj);
      return prev;
    }, []);
  },
  getAppointmentById: async (id) => {
    return await prisma.appointment.findUnique({
      where: { id: Number(id) },
    });
  },
  getAppointmentByDoctorId: async (id) => {
    const result = await prisma.user.findUnique({
      where: { id: Number(id) },
      omit: { password: true, createdAt: true },
      include: {
        doctor: {
          include: {
            appointments: {
              where: { OR: [{ status: "COMPLETED" }, { status: "SCHEDULED" }] },
              omit: { doctorId: true },
              include: {
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
          omit: { userId: true },
        },
      },
    });
    return result.doctor.appointments;
  },
  getAppointmentByPatientId: async (id) => {
    const result = await prisma.patient.findUnique({
      where: { id: Number(id) },
      include: {
        user: { select: { firstName: true, lastName: true } },
        appointments: {
          orderBy: { date: "desc" },
          include: {
            doctor: {
              include: {
                user: { select: { firstName: true, lastName: true } },
              },
            },
          },
        },
      },
    });
    return result;
  },
  createAppointment: async (date, time, doctorId, patientId) => {
    return await prisma.appointment.create({
      data: { date: new Date(date), time, doctorId, patientId },
    });
  },
  deleteAppointmentById: async (id) => {
    return await prisma.appointment.delete({
      where: { id: Number(id) },
    });
  },
  updateAppointmentById: async (id, date, time, doctorId, patientId) => {
    return await prisma.appointment.update({
      where: { id: Number(id) },
      data: { date: new Date(date), time, doctorId, patientId },
    });
  },
  patchAppointmentById: async (id, status) => {
    return await prisma.appointment.update({
      where: { id: Number(id) },
      data: { status },
    });
  },
};

export default appointmentsService;
