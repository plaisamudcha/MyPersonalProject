import prisma from "../config/prisma.js";

const appointmentsService = {
  getAllAppointments: async () => {
    const result = await prisma.appointment.findMany({
      omit: { doctorId: true, patientId: true, updatedAt: true },
<<<<<<< HEAD
=======
      orderBy: { date: "desc" },
>>>>>>> c55d519 (second commit)
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
<<<<<<< HEAD
        doctor: { include: { appointments: true }, omit: { userId: true } },
=======
        doctor: {
          include: {
            appointments: {
              where: { OR: [{ status: "COMPLETED" }, { status: "SCHEDULED" }] },
              omit: { doctorId: true, patientId: true },
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
>>>>>>> c55d519 (second commit)
      },
    });
    return result.doctor.appointments;
  },
  getAppointmentByPatientId: async (id) => {
    const result = await prisma.user.findUnique({
      where: { id: Number(id) },
      omit: { password: true, createdAt: true },
      include: {
        patient: { include: { appointments: true }, omit: { userId: true } },
      },
    });
    return result.patient.appointments;
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
