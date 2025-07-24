import cloudinary from "../config/cloudinary.js";
import patientsService from "../services/patients.service.js";
import createError from "../utils/create-error.util.js";
import path from "path";
import fs from "fs/promises";

const patientsController = {
  getAllPatient: async (req, res, next) => {
    try {
      const { name } = req.query;
      const allPatients = await patientsService.getAllPatients(name);
      res.json({ allPatients });
    } catch (error) {
      next(error);
    }
  },
  getPatientById: async (req, res, next) => {
    try {
      const { patientId } = req.params;
      const patient = await patientsService.getPatientById(patientId);
      if (!patient) createError(400, "Patient not found");
      res.json({ patient });
    } catch (error) {
      next(error);
    }
  },
  updatePatientById: async (req, res, next) => {
    try {
      const { patientId } = req.params;
      const { firstName, lastName, email, phone } = req.body;
      const patient = await patientsService.getPatientById(patientId);
      if (!patient) createError(400, "Patient not found");
      const hasFile = !!req.file;
      let uploadImage;
      if (hasFile) {
        uploadImage = await cloudinary.uploader.upload(req.file.path, {
          overwrite: true,
          public_id: path.parse(req.file.path).name,
        });
        fs.unlink(req.file.path);
      }
      const profileImage = uploadImage?.secure_url || patient.profileImage;
      await patientsService.updatePatientById(
        patientId,
        firstName,
        lastName,
        email,
        phone,
        profileImage
      );
      res.json({ message: `Update patient information success` });
    } catch (error) {
      next(error);
    }
  },
  softDeletePatientById: async (req, res, next) => {
    try {
      const { patientId } = req.params;
      const patient = await patientsService.getPatientById(patientId);
      if (!patient) createError(400, "Patient not found");
      await patientsService.softDeletePatientById(patientId);
      res.json({
        message: `${patient.user.firstName} ${patient.user.lastName} has been delete!!!`,
      });
    } catch (error) {
      next(error);
    }
  },
};

export default patientsController;
