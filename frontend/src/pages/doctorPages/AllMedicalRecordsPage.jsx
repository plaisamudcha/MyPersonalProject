import { useEffect, useState } from "react";
import useMedicalRecordStore from "../../stores/useMedicalRecordStore";
import SearchTextForm from "../../components/SearchForm";
import MedicalDoctorForm from "../../components/MedicalDoctorForm";

function AllMedicalRecordPage() {
  const [patientSearch, setPatientSearch] = useState("");
  const medicalRecords = useMedicalRecordStore(
    (state) => state.medicalRecords ?? []
  );
  const getAllMedicalRecords = useMedicalRecordStore(
    (state) => state.getAllMedicalRecords
  );
  const [filteredMedicalRecords, setFilteredMedicalRecords] = useState([]);
  useEffect(() => {
    getAllMedicalRecords();
  }, []);
  useEffect(() => {
    const result = medicalRecords.filter((el) => {
      const patientName =
        `${el.medicalRecord?.patient?.firstName} ${el.medicalRecord?.patient?.lastName}`.toLowerCase();
      const matchPatient = patientName.includes(patientSearch.toLowerCase());
      return matchPatient;
    });
    setFilteredMedicalRecords(result);
  }, [patientSearch, medicalRecords]);
  return (
    <div>
      <div className="relative flex flex-col gap-7 overflow-auto">
        <h1 className="text-3xl font-bold text-center">
          List of all medical-records : {filteredMedicalRecords.length}
        </h1>
        <div className="flex border p-2 rounded-xl shadow-md justify-around">
          <SearchTextForm
            head="Search by Patient name"
            search={patientSearch}
            setSearch={setPatientSearch}
          />
        </div>
        <div className="w-full">
          <table className="table table-auto w-full">
            <thead>
              <tr>
                <th className="text-center">Medical-record ID</th>
                <th className="text-center">Patient</th>
                <th className="text-center">Name</th>
                <th className="text-center">Date</th>
                <th className="text-center">diagnosis</th>
                <th className="text-center">notes</th>
              </tr>
            </thead>
            <tbody className="font-bold">
              {filteredMedicalRecords.map((el) => (
                <MedicalDoctorForm key={el.id} el={el} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* <pre>{JSON.stringify(medicalRecords, null, 2)}</pre> */}
    </div>
  );
}
export default AllMedicalRecordPage;
