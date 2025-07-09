import { createBrowserRouter } from "react-router";
import { lazy } from "react";

const GuestLayout = lazy(() => import("../layouts/GuestLayout"));
const HomePage = lazy(() => import("../pages/guestPages/HomePage"));
const LoginPage = lazy(() => import("../pages/guestPages/LoginPage"));
const RegisterPage = lazy(() => import("../pages/guestPages/RegisterPage"));
const OurDoctorPage = lazy(() => import("../pages/guestPages/OurDoctorPage"));
const ResetPage = lazy(() => import("../pages/guestPages/ResetPage"));
const GoToHomeRouter = lazy(() => import("../pages/GoToHomeRouter"));

const GuestRouter = createBrowserRouter([
  {
    path: "/",
    Component: GuestLayout,
    children: [
      { index: true, Component: HomePage },
      { path: "login", Component: LoginPage },
      { path: "reset/:token", Component: ResetPage },
      { path: "register/patient", Component: RegisterPage },
      { path: "publicDoctor", Component: OurDoctorPage },
      { path: "*", Component: GoToHomeRouter },
    ],
  },
]);

export default GuestRouter;
