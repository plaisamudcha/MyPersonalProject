import express from "express";
import morgan from "morgan";
import notFoundMiddleware from "./middlewares/not-found.middleware.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import authRoute from "./routes/auth.route.js";
import doctorsRoute from "./routes/doctors.route.js";
import patientsRoute from "./routes/patients.route.js";
import appointmentsRoute from "./routes/appointments.route.js";
import medicalsRoute from "./routes/medicals.route.js";
import prescriptionsRoute from "./routes/prescriptions.route.js";
import medicinesRoute from "./routes/medicines.route.js";
import stocksRoute from "./routes/stocks.route.js";
import paymentsRoute from "./routes/payments.route.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.get("/db-test", async (req, res) => {
  try {
    res.status(200).json({ message: "Database connection is working!" });
  } catch (error) {
    res.status(500).json({ message: "Database connection failed!" });
  }
});

app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(cors());

app.use("/api/auth", authRoute);
app.use("/api/doctors", doctorsRoute);
app.use("/api/patients", patientsRoute);
app.use("/api/appointments", appointmentsRoute);
app.use("/api/medical-records", medicalsRoute);
app.use("/api/prescriptions", prescriptionsRoute);
app.use("/api/medicines", medicinesRoute);
app.use("/api/stock-logs", stocksRoute);
app.use("/api/payments", paymentsRoute);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
