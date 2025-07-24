import { useEffect, useState } from "react";
import { Link } from "react-router";
import useDoctorStore from "../../../stores/useDoctorStore";
import DoctorCard from "../../../components/DoctorCard";
import EditDoctorPage from "./EditDoctorPage";
import SearchTextForm from "../../../components/SearchForm";

function DoctorsListPage() {
  const [file, setFile] = useState("");
  const [resetForm, setResetForm] = useState(false);
  const [searchName, setSearchName] = useState("");
  const [isOpenEdit, setIsOpenEdit] = useState(null);
  const doctors = useDoctorStore((state) => state.doctors);
  const getAllDoctors = useDoctorStore((state) => state.getAllDoctors);

  useEffect(() => {
    getAllDoctors(searchName);
  }, [searchName]);
  useEffect(() => {
    if (isOpenEdit) {
      document.getElementById(`updateDoctor-form${isOpenEdit}`).showModal();
    }
  }, [isOpenEdit]);

  const hdlClose = () => {
    setIsOpenEdit(null);
    setFile("");
    setResetForm((prv) => !prv);
  };
  return (
    <div className="flex flex-col gap-7 ">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-center">
          List of all doctors : {doctors.length}
        </h1>
        <Link
          to="/admin/register/doctor"
          className="absolote right-0 top-0 btn btn-secondary btn-lg w-50 rounded-lg"
        >
          Create new Doctor
        </Link>
      </div>
      <div className="flex border p-2 rounded-xl shadow-md justify-around">
        <SearchTextForm
          head="Search by name"
          search={searchName}
          setSearch={setSearchName}
        />
      </div>

      <div className="flex flex-wrap gap-10 justify-around overflow-auto">
        {doctors.map((item) => (
          <div key={item.id}>
            <DoctorCard
              item={item}
              setIsOpenEdit={setIsOpenEdit}
              searchName={searchName}
            />
          </div>
        ))}
      </div>
      {doctors.map((item, idx) =>
        isOpenEdit === item.id ? (
          <dialog
            id={`updateDoctor-form${item.id}`}
            className="modal"
            onClose={hdlClose}
          >
            <div className="modal-box rounded-lg">
              <EditDoctorPage
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

export default DoctorsListPage;
