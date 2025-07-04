import React, { useEffect } from "react";
import useUserStore from "../../stores/useUserStore";
import DoctorForm from "../../components/doctorForm";

function OurDoctorPage() {
  const getPublicDoctor = useUserStore((state) => state.getPublicDoctor);
  const doctors = useUserStore((state) => state.doctors);
  useEffect(() => {
    getPublicDoctor();
  }, []);
  return (
    <div className="w-3/5 mx-auto mt-15">
      <h1 className="text-4xl font-bold text-center mb-10">Our Doctors</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {doctors.map((user, index) => (
          <DoctorForm key={index} user={user} />
        ))}
      </div>
    </div>
  );
}

export default OurDoctorPage;
