import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import useUserStore from "../../stores/useUserStore";
import { useEffect, useState } from "react";
import defaultImage from "../../assets/defaultImage.jpg";
import patientImage from "../../assets/patientImage.png";
import appointmentImage from "../../assets/appointmentImage.jpg";
import medicalImage from "../../assets/medicalImage.jpg";
import useAppointmentStore from "../../stores/useAppointmentStore";
import useMedicalRecordStore from "../../stores/useMedicalRecordStore";

// const mockData = [
//   { month: "Jan", appointments: 8 },
//   { month: "Feb", appointments: 14 },
//   { month: "Mar", appointments: 10 },
//   { month: "Apr", appointments: 18 },
//   { month: "May", appointments: 20 },
//   { month: "Jun", appointments: 12 },
// ];

function Dashboard() {
  const user = useUserStore((state) => state.user);
  const appointmentsByDoctorId = useAppointmentStore(
    (state) => state.appointmentsByDoctorId
  );
  const getAllAppointmentsByDoctor = useAppointmentStore(
    (state) => state.getAllAppointmentsByDoctor
  );
  const medicalRecords = useMedicalRecordStore(
    (state) => state.medicalRecords ?? []
  );

  useEffect(() => {
    getAllAppointmentsByDoctor();
  }, []);
  const monthOrder = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const uniquePatientCount = appointmentsByDoctorId.reduce(
    (acc, curr) => {
      if (!acc.ids.includes(curr.patientId)) {
        acc.ids.push(curr.patientId);
      }
      return acc;
    },
    { ids: [] }
  ).ids.length;

  const lineData = Object.values(
    appointmentsByDoctorId
      .filter((item) => item.status === "COMPLETED")
      .reduce((prev, curr) => {
        const date = new Date(curr.date);
        const month = date.toLocaleString("en-US", { month: "short" });
        prev[month] = prev[month] || { name: month, value: 0 };
        prev[month].value += 1;
        return prev;
      }, {})
  ).sort((a, b) => monthOrder.indexOf(a.name) - monthOrder.indexOf(b.name));
  console.log(lineData);
  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between items-center border rounded-lg p-8 text-shadow-md">
        <div className="flex gap-3 items-center">
          <div className="avatar">
            <div className="w-12 rounded-full">
              <img
                src={user.doctor.profileImage || defaultImage}
                alt="defaultImage"
              />
            </div>
          </div>
          <p className="text-3xl font-bold text-accent">
            Welcome, {user.firstName} {user.lastName}
          </p>
        </div>
        <p className="font-bold text-3xl text-accent">
          Specialize : {user.doctor.specialization}
        </p>
      </div>
      <div className="flex justify-around">
        <div className="flex flex-col items-center justify-center border rounded-lg font-bold w-32 h-32 border-gray-400">
          <div className="avatar">
            <div className="w-12 rounded-full">
              <img src={patientImage} alt="patientImage" />
            </div>
          </div>
          <p>{uniquePatientCount}</p>
          <p>Patients</p>
        </div>
        <div className="flex flex-col items-center justify-center border rounded-lg font-bold w-32 h-32 border-gray-400">
          <div className="avatar">
            <div className="w-12 rounded-full">
              <img src={appointmentImage} alt="appointmentImage" />
            </div>
          </div>

          <p>{appointmentsByDoctorId.length}</p>
          <p>Appointments</p>
        </div>
        <div className="flex flex-col items-center justify-center border rounded-lg font-bold w-32 h-32 border-gray-400">
          <div className="avatar">
            <div className="w-12 rounded-full">
              <img src={medicalImage} alt="medicalImage" />
            </div>
          </div>
          <p>{medicalRecords.length}</p>
          <p>Medical records</p>
        </div>
      </div>
      <div className="p-8 space-y-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Monthly Appointments</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineData}>
              <CartesianGrid stroke="#e0e0e0" strokeDasharray="5 5" />
              <XAxis dataKey="month" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="appointments"
                stroke="#4f46e5"
                strokeWidth={3}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
