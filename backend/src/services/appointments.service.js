import prisma from "../config/prisma.js";

const appointmentsService = {
  getAllAppointments: async (page, limit, docName = "", patName = "") => {
    const [total, appointments] = await Promise.all([
      prisma.appointment.count({
        where: {
          doctor: {
            user: {
              OR: [
                { firstName: { contains: docName } },
                { lastName: { contains: docName } },
              ],
            },
          },
          patient: {
            user: {
              OR: [
                { firstName: { contains: patName } },
                { lastName: { contains: patName } },
              ],
            },
          },
        },
      }),
      prisma.appointment.findMany({
        where: {
          doctor: {
            user: {
              OR: [
                { firstName: { contains: docName } },
                { lastName: { contains: docName } },
              ],
            },
          },
          patient: {
            user: {
              OR: [
                { firstName: { contains: patName } },
                { lastName: { contains: patName } },
              ],
            },
          },
        },
        skip: (page - 1) * limit,
        take: limit,
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
      }),
    ]);

    const data = appointments.reduce((prev, curr) => {
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
    return {
      total,
      data,
    };
  },
  getAppointmentById: async (id) => {
    return await prisma.appointment.findUnique({
      where: { id: Number(id) },
      include: { medicalRecord: true },
    });
  },
  getAppointmentByDoctorId: async (
    id,
    page,
    limit,
    patName = "",
    status = ""
  ) => {
    const statusForms = ["SCHEDULED", "COMPLETED", "CANCELED"];
    const [total, appointments] = await Promise.all([
      prisma.appointment.count({
        where: {
          AND: [
            { doctor: { user: { id: Number(id) } } },
            {
              patient: {
                user: {
                  OR: [
                    { firstName: { contains: patName } },
                    { lastName: { contains: patName } },
                  ],
                },
              },
            },
            ...(statusForms.includes(status)
              ? [{ status: { equals: status } }]
              : []),
          ],
        },
      }),
      prisma.appointment.findMany({
        where: {
          AND: [
            { doctor: { user: { id: Number(id) } } },
            {
              patient: {
                user: {
                  OR: [
                    { firstName: { contains: patName } },
                    { lastName: { contains: patName } },
                  ],
                },
              },
            },
            ...(statusForms.includes(status)
              ? [{ status: { equals: status } }]
              : []),
          ],
        },
        include: {
          patient: {
            include: { user: { select: { firstName: true, lastName: true } } },
          },
          medicalRecord: true,
        },
        orderBy: { date: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
    ]);
    return { total, appointments };
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
  findAppointmentDateTime: async (date, time, doctorId) => {
    return await prisma.appointment.findFirst({
      where: { date, time, doctorId },
    });
  },
};

export default appointmentsService;
