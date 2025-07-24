import prisma from "../config/prisma.js";

const paymentsService = {
  getAllPayments: async (page, limit, name = "") => {
    const [total, payments] = await Promise.all([
      prisma.payment.count({
        where: {
          patient: {
            user: {
              OR: [
                { firstName: { contains: name } },
                { lastName: { contains: name } },
              ],
            },
          },
        },
      }),
      prisma.payment.findMany({
        where: {
          patient: {
            user: {
              OR: [
                { firstName: { contains: name } },
                { lastName: { contains: name } },
              ],
            },
          },
        },
        include: {
          patient: {
            include: { user: { select: { firstName: true, lastName: true } } },
          },
        },
        skip: (page - 1) * limit,
        take: limit,
      }),
    ]);
    return { total, payments };
  },
  getPaymentById: async (id) => {
    return await prisma.payment.findUnique({ where: { id: Number(id) } });
  },
  createPayment: async (amount, paymentMethod, patientId, appointmentId) => {
    return await prisma.payment.create({
      data: { amount, paymentMethod, patientId, appointmentId },
    });
  },
  updatePayment: async (id, status) => {
    return await prisma.payment.update({
      where: { id: Number(id) },
      data: { status, paidAt: new Date() },
    });
  },
  getPaymentByPatientId: async (id) => {
    const result = await prisma.patient.findUnique({
      where: { id: Number(id) },
      include: { payment: true },
    });
    return result;
  },
  getPaymentByAppointmentId: async (id) => {
    const result = await prisma.appointment.findUnique({
      where: { id: Number(id) },
      include: {
        payment: true,
        patient: {
          include: { user: { select: { firstName: true, lastName: true } } },
        },
      },
    });
    return result;
  },
};

export default paymentsService;
