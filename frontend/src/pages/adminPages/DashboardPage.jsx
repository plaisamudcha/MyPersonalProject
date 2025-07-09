import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import useDoctorStore from "../../stores/useDoctorStore";
import { useEffect } from "react";
import usePatientStore from "../../stores/usePatientStore";
import useAppointmentStore from "../../stores/useAppointmentStore";
import useMedicineStore from "../../stores/useMedicineStore";

function Dashboard() {
  const doctors = useDoctorStore((state) => state.doctors);
  const getAllDoctors = useDoctorStore((state) => state.getAllDoctors);
  const patients = usePatientStore((state) => state.patients);
  const getAllPatients = usePatientStore((state) => state.getAllPatients);
  const appointments = useAppointmentStore((state) => state.appointments);
  const getAllAppointments = useAppointmentStore(
    (state) => state.getAllAppointments
  );
  const medicines = useMedicineStore((state) => state.medicines);
  const getAllMedicines = useMedicineStore((state) => state.getAllMedicines);
  // const fullMonth = date.toLocaleString("en-US", { month: "long" });
  useEffect(() => {
    getAllDoctors();
    getAllPatients();
    getAllAppointments();
    getAllMedicines();
  }, []);
  const metrics = [
    { label: "Doctors", value: doctors.length },
    { label: "Patients", value: patients.length },
    { label: "Appointments", value: appointments.length },
  ];
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

  const lineData = Object.values(
    appointments
      .filter((item) => item.status === "COMPLETED")
      .reduce((prev, curr) => {
        const date = new Date(curr.date);
        const month = date.toLocaleString("en-US", { month: "short" });
        prev[month] = prev[month] || { name: month, value: 0 };
        prev[month].value += 1;
        return prev;
      }, {})
  ).sort((a, b) => monthOrder.indexOf(a.name) - monthOrder.indexOf(b.name));
  // const lineData = [
  //   { name: "Jan", value: 10 },
  //   { name: "Feb", value: 20 },
  //   { name: "Mar", value: 15 },
  //   { name: "Apr", value: 25 },
  //   { name: "May", value: 40 },
  //   { name: "Jun", value: 38 },
  //   { name: "Jul", value: 50 },
  // ];
  const barData = Object.values(
    medicines.reduce((prev, curr) => {
      const medName = curr.name || "Unknown";
      prev[medName] = prev[medName] || { name: medName, value: 0 };
      prev[medName].value += curr.stock;
      return prev;
    }, {})
  )
    .sort((a, b) => b.value - a.value)
    .slice(0, 7);
  console.log("barData", barData);
  // const barData = [
  //   { name: "Paracetamol", value: 50 },
  //   { name: "Ibuprofen", value: 45 },
  //   { name: "Amoxicillin", value: 35 },
  //   { name: "Cough Syrup", value: 28 },
  //   { name: "Vitamin C", value: 25 },
  //   { name: "Aspirin", value: 20 },
  // ];
  return (
    <div className="flex-1 p-8">
      {/* Metrics */}
      <div className="flex w-full gap-6 mb-8  justify-between">
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className="bg-white p-6 rounded-lg shadow w-1/3"
          >
            <p className="text-gray-500">{metric.label}</p>
            <p className="text-2xl font-bold">{metric.value}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="flex gap-6">
        {/* Line Chart */}
        <div className="bg-white p-6 rounded-lg shadow flex-1">
          <h2 className="text-lg font-semibold mb-4">Appointments Over Time</h2>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 5" />
              <XAxis dataKey="name" />
              <YAxis dataKey="value" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#2563eb"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="bg-white p-6 rounded-lg shadow flex-1">
          <h2 className="text-lg font-semibold mb-4">
            Most Prescribed Medicines
          </h2>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={barData}>
              <XAxis dataKey="name" />
              <YAxis dataKey="value" />
              <Tooltip />
              <Bar dataKey="value" fill="#2563eb" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* <pre>{JSON.stringify(appointments, null, 2)}</pre> */}
      {/* <pre>{JSON.stringify(medicines, null, 2)}</pre> */}
    </div>
  );
}

export default Dashboard;
