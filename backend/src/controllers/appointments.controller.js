import appointmentsService from "../services/appointments.service.js";
import doctorsService from "../services/doctors.service.js";
import patientsService from "../services/patients.service.js";
import createError from "../utils/create-error.util.js";

const appointmentsController = {
  getAllAppointments: async (req, res, next) => {
    try {
      const { page, limit, docName, patName } = req.query;
      const allAppointments = await appointmentsService.getAllAppointments(
        Number(page),
        Number(limit),
        docName,
        patName
      );
      res.json({ allAppointments });
    } catch (error) {
      next(error);
    }
  },
  getAppointmentById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const appointment = await appointmentsService.getAppointmentById(id);
      if (!appointment) createError(400, "Appointment not found!!!");
      res.json({ appointment });
    } catch (error) {
      next(error);
    }
  },
  getAppointmentByDoctorId: async (req, res, next) => {
    try {
      const { page, limit, name, status } = req.query;
      const appointments = await appointmentsService.getAppointmentByDoctorId(
        req.user.id,
        Number(page),
        Number(limit),
        name,
        status
      );
      if (!appointments) createError(400, "Doctor not found!!!");
      res.json({ appointments });
    } catch (error) {
      next(error);
    }
  },
  getAppointmentByPatientId: async (req, res, next) => {
    try {
      const appointments = await appointmentsService.getAppointmentByPatientId(
        req.user.id
      );
      if (!appointments) createError(400, "Patient not found!!!");
      res.json({ appointments });
    } catch (error) {
      next(error);
    }
  },
  createAppointment: async (req, res, next) => {
    try {
      const { date, time, doctorId, patientId } = req.body;
      const doctor = await doctorsService.getDoctorById(doctorId);
      if (!doctor) createError(400, "doctorId not found");
      const patient = await patientsService.getPatientById(patientId);
      if (!patient) createError(400, "patientId not found");
      const exist = await appointmentsService.findAppointmentDateTime(
        date,
        time,
        doctorId
      );
      if (exist) createError(400, "This time has appointment already");
      await appointmentsService.createAppointment(
        date,
        time,
        doctorId,
        patientId
      );
      res.json({
        message: `Create appointment success Doctor:${doctor.user.firstName}, Patient:${patient.user.firstName}`,
      });
    } catch (error) {
      next(error);
    }
  },
  deleteAppointmentById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const appointment = await appointmentsService.getAppointmentById(id);
      if (!appointment) createError(400, "Appointment not found!!!");
      await appointmentsService.deleteAppointmentById(id);
      res.json({ message: `Cancel appointmentId: ${appointment.id} success` });
    } catch (error) {
      next(error);
    }
  },
  updateAppointmentById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { date, time, doctorId, patientId } = req.body;
      const appointment = await appointmentsService.getAppointmentById(id);
      if (!appointment) createError(400, "Appointment not found!!!");
      const doctor = await doctorsService.getDoctorById(doctorId);
      if (!doctor) createError(400, "doctorId not found");
      const patient = await patientsService.getPatientById(patientId);
      if (!patient) createError(400, "patientId not found");
      const exist = await appointmentsService.findAppointmentDateTime(
        date,
        time,
        doctorId
      );
      if (exist) createError(400, "This time has appoitment already");
      await appointmentsService.updateAppointmentById(
        id,
        date,
        time,
        doctorId,
        patientId
      );
      res.json({
        message: `Change schedule appointmentId: ${appointment.id} success`,
      });
    } catch (error) {
      next(error);
    }
  },
  pathAppointmentById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const appointment = await appointmentsService.getAppointmentById(id);
      if (!appointment) createError(400, "Appointment not found!!!");
      await appointmentsService.patchAppointmentById(id, status);
      res.json({
        message: `Update status appointmentId: ${appointment.id} success`,
      });
    } catch (error) {
      next(error);
    }
  },
};

export default appointmentsController;
