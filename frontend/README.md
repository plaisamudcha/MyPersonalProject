# CC20 My-Project (PoRPaI Health Care System) FRONTEND

## Router structures

#### 1. Public Routes (Guests)

In `<GuestLayout />`

| Path              | Component/Page      | Description           |
| :---------------- | :------------------ | :-------------------- |
| /                 | HomePage            | Home                  |
| /login            | LoginPage           | Login                 |
| /register/patient | RegisterPatientPage | Register only patient |
| Use modal         | ForgotPasswordPage  | Forgot password       |
| Use modal         | ResetPasswordPage   | Reset password        |
| /publicDoctor     | OurDoctorPage       | Show our doctor       |

#### 1. Admin Routes (For Admin)

In `<AdminLayout />` (Navbar + Sidebar)

| Path                   | Component/Page        | Description              |
| :--------------------- | :-------------------- | :----------------------- |
| /admin/                | AdminDashboardPage    | Admin's dashboard        |
| /admin/register/doctor | RegisterDoctorPage    | Register only doctor     |
| /admin/doctors         | DoctorsListPage       | All list of doctors      |
| Use modal              | EditDoctorPage        | Edit doctor by id        |
| /admin/patients        | PatientsListPage      | All list of patients     |
| Use modal              | EditPatientPage       | Edit patient by id       |
| /admin/appointments    | AppointmentsListPage  | All list of appointments |
| Use modal              | CreateAppointmentPage | Create appointment by id |
| Use modal              | EditAppointmentPage   | Update appointment by id |
| /admin/medicines       | MedicinesListPage     | All list of medicines    |
| Use modal              | CreateMedicinePage    | Create medicine by id    |
| Use modal              | EditMedicinePage      | Edit medicine by id      |
| /admin/stock-logs      | StockLogsListPage     | All list of stock-logs   |
| Use modal              | CreateStockLogPage    | Create stock-log         |
| /admin/payments        | PaymentListPage       | All list of payments     |

#### 2. Doctor Routes (For Doctor)

In `<DoctorLayout />` (Navbar + Sidebar)

| Path                         | Component/Page          | Description                   |
| ---------------------------- | ----------------------- | ----------------------------- |
| /doctor/dashboard            | DoctorDashboardPage     | Doctor's dashboard            |
| /doctor/appointments         | DoctorAppointmentPage   | Doctor's appointments         |
| /doctor/medical-records      | DoctorMedicalRecordPage | Doctor's medical-records      |
| /doctor/medical-records/:id  | ViewMedicalRecordPage   | Edit doctor's medical-records |
| /doctor/prescriptions/create | CreatePrescriptionPage  | Create prescription           |

#### 3. Patient Routes (For Patient)

In `<PaientLayout />` (Navbar + Sidebar)

| Path                      | Component/Page           | Description               |
| ------------------------- | ------------------------ | ------------------------- |
| /patient/dashboard`       | PatientDashboardPage     | Patient's dashboard       |
| /patient/appointments`    | PatientAppointmentPage   | Patient's appointments    |
| /patient/medical-records` | PatientMedicalRecordPage | Patient's medical-records |
| /patient/payments`        | PatientPaymentPage       | Patient's payments        |
| /patient/profile`         | PatientProfilePage       | Edit patient's profile    |
