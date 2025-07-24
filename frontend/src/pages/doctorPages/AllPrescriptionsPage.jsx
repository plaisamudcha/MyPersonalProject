import { useEffect, useState } from "react";
import usePrescriptionStore from "../../stores/usePrescriptionStore";
import SearchTextForm from "../../components/SearchForm";
import PrescriptionForm from "../../components/PrescriptionForm";

function AllPrescriptionsPage() {
  const [patientSearch, setPatientSearch] = useState("");
  const [medicineSearch, setMedicineSearch] = useState("");
  const prescriptions = usePrescriptionStore(
    (state) => state.prescriptions ?? []
  );
  const getAllPrescriptions = usePrescriptionStore(
    (state) => state.getAllPrescriptions
  );
  const [filteredPrescriptions, setFilteredPrescriptions] = useState([]);
  useEffect(() => {
    getAllPrescriptions();
  }, []);
  useEffect(() => {
    const result = prescriptions.filter((el) => {
      const patientName =
        `${el.medicalRecord?.patient?.firstName} ${el.medicalRecord?.patient?.lastName}`.toLowerCase();
      const matchPatient = patientName.includes(patientSearch.toLowerCase());
      const matchMedicine = el.medicalRecord?.prescriptions.some((item) =>
        item.medicine?.name.toLowerCase().includes(medicineSearch.toLowerCase())
      );
      return matchPatient && matchMedicine;
    });
    setFilteredPrescriptions(result);
  }, [patientSearch, prescriptions, medicineSearch]);
  return (
    <div>
      <div className="relative flex flex-col gap-7 overflow-auto">
        <h1 className="text-3xl font-bold text-center">
          List of all prescriptions : {filteredPrescriptions.length}
        </h1>
        <div className="flex border p-2 rounded-xl shadow-md justify-around">
          <SearchTextForm
            head="Search by Patient name"
            search={patientSearch}
            setSearch={setPatientSearch}
          />
          <SearchTextForm
            head="Search by Medicine name"
            search={medicineSearch}
            setSearch={setMedicineSearch}
          />
        </div>
        <div className="w-full">
          <table className="table table-auto max-w-full">
            <thead>
              <tr>
                <th className="text-center">Prescription ID</th>
                <th className="text-center">Patient</th>
                <th className="text-center">Name</th>
                <th className="text-center">dosage</th>
                <th className="text-center">duration</th>
                <th className="text-center">Medicine's name</th>
              </tr>
            </thead>
            <tbody className="font-bold">
              {filteredPrescriptions.map((el, idx) => (
                <PrescriptionForm key={idx} el={el} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AllPrescriptionsPage;
