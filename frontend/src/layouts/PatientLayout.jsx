import React from "react";
import { Outlet } from "react-router";

function PatientLayout() {
  return (
    <>
      <div>PatientLayout</div>
      <Outlet />
    </>
  );
}

export default PatientLayout;
