import { number, date, object, string } from "yup";

const today = new Date();

const adminSchema = {
  updateDoctor: object({
    firstName: string()
      .min(3, "Your firstname at least 3")
      .required("Firstname is required"),
    lastName: string()
      .min(3, "Your firstname at least 3")
      .required("Lastname is required"),
    email: string().email("Email is incorrect").required("Email is required"),
    specialization: string().required("Put your specialization"),
  }).noUnknown(),
  updatePatient: object({
    firstName: string()
      .min(3, "Your firstname at least 3")
      .required("firstname is required"),
    lastName: string()
      .min(3, "Your firstname at least 3")
      .required("lastname is required"),
    email: string().email("Email is incorrect").required("Email is required"),
    phone: string()
      .matches(/^0\d{8,9}$/, "Invalid phone number (0{8,9}xxxxxxxx)")
      .required("Phone number is required"),
  }).noUnknown(),
  createAppointment: object({
    date: date()
      .min(today, "Can't choose past time")
      .required("Date is required"),
    time: string()
      .matches(
        /^((0[8-9])|(1[0-6])):[0-5][0-9]$|^17:00$/,
        "Choose between 08:00 - 17:00"
      )
      .required("Time is required"),
    doctorId: number()
      .min(1, "Only positive number")
      .integer("Only integer number")
      .required("doctorId is required"),
    patientId: number()
      .min(1, "Only positive number")
      .integer("Only integer number")
      .required("patientId is required"),
  }).noUnknown(),
  createMedicine: object({
    name: string().required("name is required"),
    description: string().required("description is required"),
    pricePerUnit: number()
      .min(0, "Positive number")
      .required("Price is required"),
    form: string().required("form is required"),
  }).noUnknown(),
  createStock: object({
    change: number()
      .integer("Only integer number")
      .required("Change is required"),
    reason: string().required("Reason is required"),
    medicineId: number()
      .integer("Only integer number")
      .required("MedicineId is required"),
  }).noUnknown(),
};

export default adminSchema;
