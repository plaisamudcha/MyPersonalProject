import React, { useEffect } from "react";
import useUserStore from "../../stores/useUserStore";
import DoctorForm from "../../components/DoctorForm";

function OurDoctorPage() {
  const getPublicDoctor = useUserStore((state) => state.getPublicDoctor);
  const doctors = useUserStore((state) => state.doctors);
  useEffect(() => {
    getPublicDoctor();
  }, []);
  return (
    <div className="w-screen mx-auto flex-1 overflow-auto">
      <div className="min-h-screen bg-base-100 py-12 px-4">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-neutral">Our Doctors</h1>
          <p className="text-gray-500 mt-2">
            Meet our experienced team of professionals
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {doctors.map((user, index) => (
            <DoctorForm key={index} user={user} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default OurDoctorPage;
