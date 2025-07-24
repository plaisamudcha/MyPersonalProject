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
import { useQuery } from "@tanstack/react-query";
import {
  fetchAppointments,
  fetchDoctors,
  fetchMedicine,
  fetchPatients,
} from "../../utils/query";

function Dashboard() {
  // const { data: appointments = [] } = useQuery({
  //   queryKey: ["Appointments"],
  //   queryFn: () => fetchApppointments,
  // });
  // const { data: doctors = [] } = useQuery({
  //   queryKey: ["Doctors"],
  //   queryFn: () => fetchDoctors,
  // });
  // const { data: patients = [] } = useQuery({
  //   queryKey: ["Patients"],
  //   queryFn: () => fetchPatients,
  // });
  // const { data: medicines = [] } = useQuery({
  //   queryKey: ["Medicines"],
  //   queryFn: () => fetchMedicine,
  // });
  const queries = {
    appointments: useQuery({
      queryKey: ["Appointments"],
      queryFn: () => fetchAppointments(1, 100, "", ""),
      staleTime: 1000 * 60 * 2,
    }),
    doctors: useQuery({
      queryKey: ["Doctors"],
      queryFn: () => fetchDoctors(""),
      staleTime: 1000 * 60 * 2,
    }),
    patients: useQuery({
      queryKey: ["Patients"],
      queryFn: () => fetchPatients(""),
      staleTime: 1000 * 60 * 2,
    }),
    medicines: useQuery({
      queryKey: ["Medicines"],
      queryFn: () => fetchMedicine(1, 100, "", ""),
      staleTime: 1000 * 60 * 2,
    }),
  };

  // เช็ก loading/error ได้แบบนี้
  if (Object.values(queries).some((q) => q.isLoading)) return <p>Loading...</p>;
  if (Object.values(queries).some((q) => q.error)) return <p>Error!</p>;

  const { appointments, doctors, patients, medicines } = {
    appointments: queries.appointments.data ?? [],
    doctors: queries.doctors.data ?? [],
    patients: queries.patients.data ?? [],
    medicines: queries.medicines.data ?? [],
  };
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

  console.log(lineData);
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
