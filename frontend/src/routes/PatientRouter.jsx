import { createBrowserRouter, Navigate } from "react-router";
import { lazy } from "react";

const PatientLayout = lazy(() => import("../layouts/PatientLayout"));
const DashboardPage = lazy(() => import("../pages/patientPages/DashboardPage"));
const GoToHomeRouter = lazy(() => import("../pages/GoToHomeRouter"));

const PatientRouter = createBrowserRouter([
  {
    path: "/",
    Component: PatientLayout,
    children: [
      { index: true, Component: DashboardPage },
      { path: "*", Component: GoToHomeRouter },
    ],
  },
]);

export default PatientRouter;
