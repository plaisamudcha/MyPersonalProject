import { date, number, object, ref, string } from "yup";

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
    specialization: string().required("Put your specialization"),
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
  resetPassword: object({
    password: string()
      .min(6, "Password at least 6")
      .required("Password is required"),
    confirmPassword: string()
      .oneOf([ref("password")], "Password is not match")
      .required("Confirmpassword is required"),
  }).noUnknown(),
};

export default authSchema;
