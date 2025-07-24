import doctorsService from "../services/doctors.service.js";
import createError from "../utils/create-error.util.js";
import cloudinary from "../config/cloudinary.js";
import fs from "fs/promises";
import path from "path";

const doctorsController = {
  getAllDoctors: async (req, res, next) => {
    try {
      const { name } = req.query;
      const allDoctors = await doctorsService.getAllDoctors(name);
      res.json({ allDoctors });
    } catch (error) {
      next(error);
    }
  },
  getDoctorById: async (req, res, next) => {
    try {
      const { doctorId } = req.params;
      const doctor = await doctorsService.getDoctorById(doctorId);
      if (!doctor) createError(400, "Doctor not found");
      res.json({ doctor });
    } catch (error) {
      next(error);
    }
  },
  updateDoctorById: async (req, res, next) => {
    try {
      const { doctorId } = req.params;
      const { firstName, lastName, email, specialization } = req.body;
      const doctor = await doctorsService.getDoctorById(doctorId);
      if (!doctor) createError(400, "Doctor not found");
      const hasFile = !!req.file;
      let uploadImage;
      if (hasFile) {
        uploadImage = await cloudinary.uploader.upload(req.file.path, {
          overwrite: true,
          public_id: path.parse(req.file.path).name,
        });
        fs.unlink(req.file.path);
      }
      const profileImage = uploadImage?.secure_url || doctor.profileImage;
      // console.log("uploadImage", uploadImage);
      // console.log("profileImage", profileImage);
      await doctorsService.updateDoctorById(
        doctorId,
        firstName,
        lastName,
        email,
        specialization,
        profileImage
      );
      res.json({ message: `Update doctor information success` });
    } catch (error) {
      next(error);
    }
  },
  softDeleteDoctorById: async (req, res, next) => {
    try {
      const { doctorId } = req.params;
      const doctor = await doctorsService.getDoctorById(doctorId);
      if (!doctor) createError(400, "Doctor not found");
      await doctorsService.softDeleteDoctorById(doctorId);
      res.json({
        message: `${doctor.user.firstName} ${doctor.user.lastName} has been deleted!!!`,
      });
    } catch (error) {
      next(error);
    }
  },
};

export default doctorsController;
