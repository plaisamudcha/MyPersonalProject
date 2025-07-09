import { number, date, object, string } from "yup";

const doctorSchema = {
  createMedicalRecord: object({
    diagnosis: string().required("Diagnosis is required"),
    notes: string().required("Notes is required"),
    appointmentId: number()
      .integer("Only interger number")
      .required("appointmentId is required"),
  }).noUnknown(),
  createPrescription: object({
    dosage: number()
      .min(0, "Only positive number")
      .integer("Only interger number")
      .required("dosage is required"),
    duration: number()
      .min(0, "Only positive number")
      .integer("Only interger number")
      .required("duration is required"),
    medicalRecordId: number()
      .integer("Only Integer number")
      .required("medicalRecordId is required"),
    medicineId: number()
      .integer("Only Integer number")
      .required("medicineId is required"),
  }).noUnknown(),
};

export default doctorSchema;
