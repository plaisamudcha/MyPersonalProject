import e from "express";
import medicalsService from "../services/medicals.service.js";
import medicinesService from "../services/medicines.service.js";
import prescriptionsService from "../services/prescription.service.js";
import createError from "../utils/create-error.util.js";

const prescriptionsController = {
  getAllPrescriptionsByAppointmentId: async (req, res, next) => {
    try {
      const { appointmentId } = req.params;
      const prescriptions = await prescriptionsService.getAllPrescriptions(
        appointmentId
      );
      res.json({ prescriptions });
    } catch (error) {
      next(error);
    }
  },
  getPrescriptionById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const prescription = await prescriptionsService.getPrescriptionById(id);
      res.json({ prescription });
    } catch (error) {
      next(error);
    }
  },
  createPrescription: async (req, res, next) => {
    try {
      const { dosage, duration, medicalRecordId, medicineId } = req.body;
      const medicalRecord = await medicalsService.getMedicalRecord(
        medicalRecordId
      );
      if (!medicalRecord) createError(400, "Medical record not found!!!");
      const medicine = await medicinesService.getMedicineById(medicineId);
      if (!medicine) createError(400, "Medicine not found!!!");
      await prescriptionsService.createPrescription(
        dosage,
        duration,
        medicalRecordId,
        medicineId
      );
      res.json({ message: "Create prescription success" });
    } catch (error) {
      next(error);
    }
  },
  getPrescriptionByDoctorId: async (req, res, next) => {
    try {
      const prescriptions =
        await prescriptionsService.getPrescriptionByDoctorId(req.user.id);
      res.json({ prescriptions });
    } catch (error) {
      next(error);
    }
  },
  deletePrescriptionById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const prescription = await prescriptionsService.getPrescriptionById(id);
      if (!prescription) createError(400, "Prescription not found!!!");
      await prescriptionsService.deletePrescriptionById(id);
      res.json({ message: "Delete prescription success" });
    } catch (error) {
      next(error);
    }
  },
  updatePrescriptionById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { createStock } = req.body;
      await prescriptionsService.updateStatusPrescription(id, createStock);
      res.json({ message: `Update createstock ID: ${id} success` });
    } catch (error) {
      next(error);
    }
  },
};

export default prescriptionsController;
