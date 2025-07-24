import { useEffect, useState } from "react";
import EditPatientPage from "./EditPatientPage";
import PatientCard from "../../../components/PatientCard";
import SearchTextForm from "../../../components/SearchForm";
import usePatientStore from "../../../stores/usePatientStore";

function PatientsListPage() {
  const [file, setFile] = useState("");
  const [resetForm, setResetForm] = useState(false);
  const [searchName, setSearchName] = useState("");
  const [isOpenEdit, setIsOpenEdit] = useState(null);
  const patients = usePatientStore((state) => state.patients);
  const getAllPatients = usePatientStore((state) => state.getAllPatients);

  useEffect(() => {
    getAllPatients(searchName);
  }, [searchName]);
  useEffect(() => {
    if (isOpenEdit) {
      document.getElementById(`updatePatient-form${isOpenEdit}`).showModal();
    }
  }, [isOpenEdit]);
  const hdlClose = () => {
    setIsOpenEdit(null);
    setFile("");
    setResetForm((prv) => !prv);
  };

  return (
    <div className="flex flex-col gap-7 overflow-auto">
      <h1 className="text-3xl font-bold text-center">
        List of all patients : {patients.length}
      </h1>
      <div className="flex border p-2 rounded-xl shadow-md justify-around">
        <SearchTextForm
          head="Search by name"
          search={searchName}
          setSearch={setSearchName}
        />
      </div>
      <div className="flex flex-wrap gap-10 justify-around">
        {patients.map((item) => (
          <div key={item.id}>
            <PatientCard
              item={item}
              setIsOpenEdit={setIsOpenEdit}
              searchName={searchName}
            />
          </div>
        ))}
      </div>
      {patients.map((item, idx) =>
        isOpenEdit === item.id ? (
          <dialog
            key={idx}
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
                searchName={searchName}
              />
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  ✕
                </button>
              </form>
            </div>
          </dialog>
        ) : (
          ""
        )
      )}
    </div>
  );
}

export default PatientsListPage;
