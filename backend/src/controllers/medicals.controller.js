import appointmentsService from "../services/appointments.service.js";
import medicalsService from "../services/medicals.service.js";
import createError from "../utils/create-error.util.js";

const medicalsController = {
  getAllMedicalRecords: async (req, res, next) => {
    try {
      const medicalRecords = await medicalsService.getAllMedicalRecords();
      res.json({ medicalRecords });
    } catch (error) {
      next(error);
    }
  },
  getMedicalRecord: async (req, res, next) => {
    try {
      const { id } = req.params;
      const medicalRecord = await medicalsService.getMedicalRecord(id);
      if (!medicalRecord) createError(400, "Medical not found!!!");
      res.json({ medicalRecord });
    } catch (error) {
      next(error);
    }
  },
  createMedicalRecord: async (req, res, next) => {
    try {
      const { diagnosis, notes, appointmentId } = req.body;
      const appointment = await appointmentsService.getAppointmentById(
        appointmentId
      );
      if (!appointment) createError(400, "Appointment not found!!!");
      const hasRecord = await medicalsService.findByAppointmentId(
        appointmentId
      );
      if (hasRecord)
        createError(400, "This appointment already has a medical record");
      await medicalsService.createMedicalRecord(
        diagnosis,
        notes,
        appointmentId
      );
      res.json({
        message: `Create medical-record in appointmentId: ${appointment.id} success`,
      });
    } catch (error) {
      next(error);
    }
  },
  getMedicalRecordByDoctorId: async (req, res, next) => {
    try {
      const { page, limit, name } = req.query;
      const medicalRecords = await medicalsService.getMedicalRecordByDoctorId(
        req.user.id,
        Number(page),
        Number(limit),
        name
      );
      res.json({ medicalRecords });
    } catch (error) {
      next(error);
    }
  },
  getMedicalRecordByPatientId: async (req, res, next) => {
    try {
      const { patientId } = req.params;
      const medicalRecords = await medicalsService.getMedicalRecordByPatientId(
        req.user.id,
        patientId
      );
      res.json({ medicalRecords });
    } catch (error) {
      next(error);
    }
  },
};

export default medicalsController;
