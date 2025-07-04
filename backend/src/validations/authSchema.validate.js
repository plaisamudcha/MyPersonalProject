import { date, number, object, ref, string } from "yup";
import { DoctorType } from "../generated/prisma/client.js";
import { AppointmentStatus } from "../generated/prisma/client.js";
import { MedicineForm } from "../generated/prisma/client.js";
import { PaymentStatus } from "../generated/prisma/client.js";

const doctorType = Object.values(DoctorType);
const appointmentStatus = Object.values(AppointmentStatus);
const medicineForm = Object.values(MedicineForm);
const paymentStatus = Object.values(PaymentStatus);
const today = new Date();
today.setHours(0, 0, 0, 0);

const authSchema = {
  registerDoctor: object({
    firstName: string()
      .min(3, "Your firstname at least 3")
      .required("Firstname is required"),
    lastName: string()
      .min(3, "Your firstname at least 3")
      .required("Lastname is required"),
    email: string().email("Email is incorrect").required("Email is required"),
    password: string()
      .min(6, "Password at least 6")
      .required("Password is required"),
    confirmPassword: string()
      .oneOf([ref("password")], "Password is not match")
      .required("Confirmpassword is required"),
    specialization: string()
      .oneOf(doctorType, "Invalid specialization")
      .required("Put your specialization"),
  }).noUnknown(),
  registerPatient: object({
    firstName: string()
      .min(3, "Your firstname at least 3")
      .required("firstname is required"),
    lastName: string()
      .min(3, "Your firstname at least 3")
      .required("lastname is required"),
    email: string().email("Email is incorrect").required("Email is required"),
    password: string()
      .min(6, "Password at least 6")
      .required("Password is required"),
    confirmPassword: string()
      .oneOf([ref("password")], "Password is not match")
      .required("Confirmpassword is required"),
    dob: date()
      .transform((value, originalValue) => {
        return originalValue === "" ? undefined : value;
      })
      .max(new Date(), "Can't choose future")
      .required("Date of birth is required"),
    gender: string().required("Put your gender"),
    phone: string()
      .matches(/^(08|09)\d{8}$/, "Invalid phone number (0{8,9}xxxxxxxx)")
      .required("Phone number is required"),
  }).noUnknown(),
  loginUser: object({
    email: string().email("Email is incorrect").required("Email is required"),
    password: string().required("Password is required"),
  }).noUnknown(),
  forgotPassword: object({
    email: string().email("Email is incorrect").required("Email is required"),
  }).noUnknown(),
  resetPasswordUser: object({
    password: string()
      .min(6, "Password at least 6")
      .required("Password is required"),
    confirmPassword: string()
      .oneOf([ref("password")], "Password is not match")
      .required("Confirmpassword is required"),
  }).noUnknown(),
  updateDoctor: object({
    firstName: string()
      .min(3, "Your firstname at least 3")
      .required("Firstname is required"),
    lastName: string()
      .min(3, "Your firstname at least 3")
      .required("Lastname is required"),
    email: string().email("Email is incorrect").required("Email is required"),
    specialization: string()
      .oneOf(doctorType, "Invalid specialization")
      .required("Put your specialization"),
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
      .integer("Only integer number")
      .required("doctorId is required"),
    patientId: number()
      .integer("Only integer number")
      .required("patientId is required"),
  }).noUnknown(),
  patchAppointment: object({
    status: string().oneOf(appointmentStatus, "Invalid status"),
  }).noUnknown(),
  createMedicalRecord: object({
    diagnosis: string().required("Diagnosis is required"),
    notes: string().required("Notes is required"),
    appointmentId: number()
      .integer("Only interger number")
      .required("appointmentId is required"),
  }).noUnknown(),
  createPrescription: object({
    dosage: string().required("dosage is required"),
    duration: string().required("duration is required"),
    medicalRecordId: number()
      .integer("Only Integer number")
      .required("medicalRecordId is required"),
    medicineId: number()
      .integer("Only Integer number")
      .required("medicineId is required"),
  }).noUnknown(),
  createMedicine: object({
    name: string().required("name is required"),
    description: string().required("description is required"),
    pricePerUnit: number()
      .min(0, "Positive number")
      .required("Price is required"),
    form: string().oneOf(medicineForm, "Invalid form"),
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
  createPayment: object({
    amount: number().min(0, "Positive number").required("Amount is required"),
    paymentMethod: string().required("Payment method is required"),
    patientId: number()
      .integer("Only interger number")
      .required("PatientId is required"),
    appointmentId: number()
      .integer("Only interger number")
      .required("AppointmentId is required"),
  }).noUnknown(),
  updatePayment: object({
    status: string()
      .oneOf(paymentStatus, "Payment status invalid")
      .required("status is required"),
  }).noUnknown(),
};

export default authSchema;
