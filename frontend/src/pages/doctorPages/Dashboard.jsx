import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import formatDate from "../../utils/formatDate";
import useAppointmentStore from "../../stores/useAppointmentStore";

function DoctorCalendarDashboard() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const appointmentsByDoctorId = useAppointmentStore(
    (state) => state.appointmentsByDoctorId
  );
  const getAllAppointmentsByDoctor = useAppointmentStore(
    (state) => state.getAllAppointmentsByDoctor
  );

  useEffect(() => {
    getAllAppointmentsByDoctor(1, 100, "", ""); // doctorId, limit, status, date
  }, []);

  const appointmentsForDay = appointmentsByDoctorId.filter(
    (item) => formatDate(item.date) === formatDate(selectedDate)
  );

  return (
    <div className="flex flex-col items-center p-6 bg-gray-50 min-h-screen gap-5">
      <h1 className="text-3xl font-bold mb-4">Doctor Appointment Calendar</h1>
      <div className="grid md:grid-cols-2 gap-10 w-full max-w-5xl">
        <Calendar
          onChange={setSelectedDate}
          value={selectedDate}
          tileContent={({ date, view }) =>
            view === "month" &&
            appointmentsByDoctorId.some(
              (appt) => formatDate(appt.date) === formatDate(date)
            ) ? (
              <div className="mt-1 w-2 h-2 bg-rose-500 rounded-full mx-auto" />
            ) : null
          }
          className="rounded-lg shadow-md bg-white p-4"
        />
        <div className="bg-white shadow-md p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">
            Appointments on {formatDate(selectedDate)}
          </h2>
          {appointmentsForDay.length > 0 ? (
            <ul className="space-y-3">
              {appointmentsForDay.map((appt, index) => (
                <li key={index} className="p-3 bg-gray-100 rounded-md">
                  <p className="text-lg font-medium">
                    {appt.patient?.user?.firstName}{" "}
                    {appt.patient?.user?.lastName}
                  </p>
                  <p className="text-gray-600">Time: {appt.time}</p>
                  <p className="text-sm text-gray-400">
                    Status:{" "}
                    <span
                      className={`font-semibold ${
                        appt.status === "COMPLETED"
                          ? "text-green-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {appt.status}
                    </span>
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No appointments on this day.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default DoctorCalendarDashboard;
