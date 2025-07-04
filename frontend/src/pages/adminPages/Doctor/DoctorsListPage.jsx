import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import useDoctorStore from "../../../stores/useDoctorStore";
import DoctorCard from "../../../components/DoctorCard";
import EditDoctorPage from "./EditDoctorPage";
import SearchTextForm from "../../../components/SearchForm";

function DoctorsListPage() {
  const [file, setFile] = useState("");
  const [resetForm, setResetForm] = useState(false);
  const [searchName, setSearchName] = useState("");
  const [searchId, setSearchId] = useState("");
  const doctors = useDoctorStore((state) => state.doctors);
  const getAllDoctors = useDoctorStore((state) => state.getAllDoctors);
  const [filteredDoctors, setFilteredDoctors] = useState([]);

  useEffect(() => {
    getAllDoctors();
  }, []);
  useEffect(() => {
    const result = doctors.filter((el) => {
      const doctorName =
        `${el.user.firstName} ${el.user.lastName}`.toLowerCase();
      const matchName = doctorName.includes(searchName.toLowerCase());
      const matchId = searchId ? el.id === Number(searchId) : true;
      return matchId && matchName;
    });
    setFilteredDoctors(result);
  }, [searchId, searchName, doctors]);

  const hdlClose = () => {
    setFile("");
    setResetForm((prv) => !prv);
  };
  return (
    <div className="flex flex-col gap-7 ">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-center">
          List of all doctors : {filteredDoctors.length}
        </h1>
        <Link
          to="/admin/register/doctor"
          className="absolote right-0 top-0 btn btn-info btn-lg w-50 rounded-lg"
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
        <SearchTextForm
          head="Search by Patient ID"
          search={searchId}
          setSearch={setSearchId}
          type="number"
        />
      </div>

      <div className="flex flex-wrap gap-10 justify-around overflow-auto">
        {filteredDoctors.map((item) => (
          <div key={item.id}>
            <DoctorCard item={item} />
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
