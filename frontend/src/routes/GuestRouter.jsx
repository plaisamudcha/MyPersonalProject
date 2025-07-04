import { createBrowserRouter, Navigate } from "react-router";
import { lazy } from "react";

const GuestLayout = lazy(() => import("../layouts/GuestLayout"));
const HomePage = lazy(() => import("../pages/guestPages/HomePage"));
const LoginPage = lazy(() => import("../pages/guestPages/LoginPage"));
const RegisterPage = lazy(() => import("../pages/guestPages/RegisterPage"));
const OurDoctorPage = lazy(() => import("../pages/guestPages/OurDoctorPage"));

const GuestRouter = createBrowserRouter([
  {
    path: "/",
    element: <GuestLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "login", element: <LoginPage /> },
      { path: "register/patient", element: <RegisterPage /> },
      { path: "publicDoctor", element: <OurDoctorPage /> },
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
]);

export default GuestRouter;
