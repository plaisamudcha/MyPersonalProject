import adminToBackend from "../api/adminApi";

const fetchPatients = async (name) => {
  const res = await adminToBackend.getAllPatients(name);
  return res.data.allPatients;
};

const fetchAppointments = async (page, limit, docName, patName) => {
  const res = await adminToBackend.getAllAppointments(
    page,
    limit,
    docName,
    patName
  );
  return res.data.allAppointments.data;
};

const fetchDoctors = async (name) => {
  const res = await adminToBackend.getAllDoctors(name);
  return res.data.allDoctors;
};

const fetchMedicine = async (page, limit, name, form) => {
  const res = await adminToBackend.getAllMedicines(page, limit, name, form);
  return res.data.medicines.medicines;
};

export { fetchPatients, fetchAppointments, fetchDoctors, fetchMedicine };
