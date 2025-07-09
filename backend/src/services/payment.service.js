import prisma from "../config/prisma.js";

const paymentsService = {
  getAllPayments: async () => {
    return await prisma.payment.findMany({
      include: {
        patient: {
          include: { user: { select: { firstName: true, lastName: true } } },
        },
      },
    });
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
