import prisma from "../config/prisma.js";

const paymentsService = {
  getAllPayments: async () => {
    return await prisma.payment.findMany();
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
    const result = await prisma.user.findUnique({
      where: { id: Number(id) },
      include: { patient: { include: { payment: true } } },
    });
    return result.patient.payment;
  },
};

export default paymentsService;
