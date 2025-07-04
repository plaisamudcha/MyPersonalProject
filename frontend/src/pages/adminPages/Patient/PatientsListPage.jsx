import React, { useEffect, useState } from "react";
import EditPatientPage from "./EditPatientPage";
import usePatientStore from "../../../stores/usePatientStore";
import PatientCard from "../../../components/PatientCard";
import SearchTextForm from "../../../components/SearchForm";

function DoctorsListPage() {
  const [file, setFile] = useState("");
  const [resetForm, setResetForm] = useState(false);
  const [searchName, setSearchName] = useState("");
  const [searchId, setSearchId] = useState("");
  const patients = usePatientStore((state) => state.patients);
  const getAllPatients = usePatientStore((state) => state.getAllPatients);
  const [filteredPatients, setFilteredPatients] = useState([]);
  useEffect(() => {
    getAllPatients();
  }, []);
  useEffect(() => {
    const result = patients.filter((el) => {
      const patinetName =
        `${el.user.firstName} ${el.user.lastName}`.toLowerCase();
      const matchName = patinetName.includes(searchName.toLowerCase());
      const matchId = searchId ? el.id === Number(searchId) : true;
      return matchId && matchName;
    });
    setFilteredPatients(result);
  }, [searchId, searchName, patients]);
  const hdlClose = () => {
    setFile("");
    setResetForm((prv) => !prv);
  };
  return (
    <div className="flex flex-col gap-7 overflow-auto">
      <h1 className="text-3xl font-bold text-center">
        List of all patients : {filteredPatients.length}
      </h1>
      <div className="flex border p-2 rounded-xl shadow-md justify-around">
        <SearchTextForm
          head="Search by name"
          search={searchName}
          setSearch={setSearchName}
        />
        <SearchTextForm
          head="Search by Patient ID"
          search={searchId}
          setSearch={setSearchId}
          type="number"
        />
      </div>

      <div className="flex flex-wrap gap-10 justify-around">
        {filteredPatients.map((item) => (
          <div key={item.id}>
            <PatientCard item={item} />
            <dialog
              id={`updatePatient-form${item.id}`}
              className="modal"
              onClose={hdlClose}
            >
              <div className="modal-box rounded-lg">
                <EditPatientPage
                  resetForm={resetForm}
                  item={item}
                  file={file}
                  setFile={setFile}
                />
                <form method="dialog">
                  <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                    ✕
                  </button>
                </form>
              </div>
            </dialog>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DoctorsListPage;
