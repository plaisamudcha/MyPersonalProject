import { useEffect, useState } from "react";
import useMedicalRecordStore from "../../stores/useMedicalRecordStore";
import SearchTextForm from "../../components/SearchForm";
import MedicalDoctorForm from "../../components/MedicalDoctorForm";
import PageButton from "../../components/PageButton";

function AllMedicalRecordPage() {
  const [patientSearch, setPatientSearch] = useState("");
  const [page, setPage] = useState(1);
  const limit = 5;
  const totalData = useMedicalRecordStore((state) => state.totalData);
  const totalPage = Math.ceil(totalData / limit);
  const medicalRecords = useMedicalRecordStore(
    (state) => state.medicalRecords ?? []
  );
  const getAllMedicalRecords = useMedicalRecordStore(
    (state) => state.getAllMedicalRecords
  );
  useEffect(() => {
    getAllMedicalRecords(page, limit, patientSearch);
  }, [page, patientSearch]);
  return (
    <div>
      <div className="relative flex flex-col gap-7">
        <h1 className="text-3xl font-bold text-center">
          List of all medical-records : {totalData}
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
              {medicalRecords.map((el) => (
                <MedicalDoctorForm key={el.id} el={el} />
              ))}
            </tbody>
          </table>
        </div>
        <PageButton page={page} setPage={setPage} totalPage={totalPage} />
      </div>
    </div>
  );
}
export default AllMedicalRecordPage;
