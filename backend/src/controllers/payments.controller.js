import appointmentsService from "../services/appointments.service.js";
import patientsService from "../services/patients.service.js";
import paymentsService from "../services/payment.service.js";
import createError from "../utils/create-error.util.js";

const paymentsController = {
  getAllPayments: async (req, res, next) => {
    try {
      const payments = await paymentsService.getAllPayments();
      res.json({ payments });
    } catch (error) {
      next(error);
    }
  },
  getPaymentById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const payment = await paymentsService.getPaymentById(id);
      res.json({ payment });
    } catch (error) {
      next(error);
    }
  },
  createPayment: async (req, res, next) => {
    try {
      const { amount, paymentMethod, patientId, appointmentId } = req.body;
      console.log("req.body", req.body);
      const patient = await patientsService.getPatientById(patientId);
      if (!patient) createError(400, "Patient not found!!!");
      const appointment = await appointmentsService.getAppointmentById(
        appointmentId
      );
      if (!appointment) createError(400, "Appointment not found!!!");
      await paymentsService.createPayment(
        amount,
        paymentMethod,
        patientId,
        appointmentId
      );
      res.json({ message: "Create payment success" });
    } catch (error) {
      next(error);
    }
  },
  updatePayment: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const payment = await paymentsService.getPaymentById(id);
      if (!payment) createError(400, "Payment not found!!!");
      await paymentsService.updatePayment(id, status);
      res.json({ message: `Update paymentId: ${payment.id} success` });
    } catch (error) {
      next(error);
    }
  },
  getPaymentByPatientId: async (req, res, next) => {
    try {
      const payments = await paymentsService.getPaymentByPatientId(req.user.id);
      res.json({ payments });
    } catch (error) {
      next(error);
    }
  },
};

export default paymentsController;
