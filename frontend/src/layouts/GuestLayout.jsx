import React from "react";
import { NavLink, Outlet } from "react-router";

const link = [
  { id: 1, path: "/", name: "Homepage" },
  { id: 2, path: "/login", name: "Login" },
  { id: 3, path: "/register/patient", name: "Register" },
  { id: 4, path: "/publicDoctor", name: "Our doctors" },
];

function GuestLayout() {
  return (
    <>
      <div className="h-screen flex flex-col">
        <header className="flex items-center justify-between h-1/10 px-6 bg-primary/60">
          <div className="flex items-center space-x-2">
            <div className="avatar">
              <div className="w-12 rounded-full">
                <img src="https://w7.pngwing.com/pngs/825/525/png-transparent-logo-cross-red-hospital-medical-office-blue-logo-color-thumbnail.png" />
              </div>
            </div>
            <h1 className="text-2xl text-shadow-md font-bold">
              PORPAI HOSPITAL SYSTEM
            </h1>
          </div>
          <div className="space-x-5">
            {link.map((el) => (
              <NavLink
                key={el.id}
                to={el.path}
                className="btn btn-ghost btn-lg"
              >
                {el.name}
              </NavLink>
            ))}
          </div>
        </header>
        <Outlet />
      </div>
    </>
  );
}

export default GuestLayout;
