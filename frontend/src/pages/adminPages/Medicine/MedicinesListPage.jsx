import { useEffect, useState } from "react";
import useMedicineStore from "../../../stores/useMedicineStore";
import MedicinesForm from "../../../components/MedicinesForm";
import EditMedicinePage from "./EditMedicinePage";
import CreateMedicinePage from "./CreateMedicinePage";
import CreateButton from "../../../components/CreateButton";
import SearchTextForm from "../../../components/SearchForm";
import SearchSelectForm from "../../../components/SearchSelectForm";

const form = [
  { id: 0, value: "", name: "All" },
  { id: 1, value: "TABLET", name: "Tablet" },
  { id: 2, value: "SYRUP", name: "Syrup" },
  { id: 3, value: "CAPSULE", name: "Capsule" },
  { id: 4, value: "INJECTION", name: "Injection" },
  { id: 5, value: "CREAM", name: "Cream" },
];

function MedicinesListPage() {
  const [resetForm, setResetForm] = useState(false);
  const [searchName, setSearchName] = useState("");
  const [searchForm, setSearchForm] = useState("");
  const medicines = useMedicineStore((state) => state.medicines);
  const getAllMedicines = useMedicineStore((state) => state.getAllMedicines);
  const [filteredMedicines, setFilteredMedicines] = useState([]);
  useEffect(() => {
    getAllMedicines();
  }, []);
  const hdlClose = () => {
    setResetForm((prv) => !prv);
  };
  useEffect(() => {
    const result = medicines.filter((el) => {
      const medicineName = `${el.name}`.toLowerCase();
      const matchMedicine = medicineName.includes(searchName.toLowerCase());
      const matchForm = searchForm ? el.form === searchForm : true;
      return matchMedicine && matchForm;
    });
    setFilteredMedicines(result);
  }, [searchForm, searchName, medicines]);
  return (
    <div className="relative flex flex-col gap-7 overflow-auto">
      <h1 className="text-3xl font-bold text-center">
        List of all medicines : {filteredMedicines.length}
      </h1>
      <CreateButton head="Create new medicine" modalID="createMedicine-form" />
      <div className="flex border p-2 rounded-xl shadow-md justify-around">
        <SearchTextForm
          head="Search by name"
          search={searchName}
          setSearch={setSearchName}
        />
        <SearchSelectForm
          head="Sarch by form"
          statusFilter={searchForm}
          setStatusFilter={setSearchForm}
          array={form}
        />
      </div>
      <div className="w-full ">
        <table className="table table-auto w-full">
          <thead>
            <tr>
              <th>Medicine Id</th>
              <th>name</th>
              <th>description</th>
              <th>stock</th>
              <th>price per unit</th>
              <th>form</th>
              <th>Edit medicine</th>
            </tr>
          </thead>
          <tbody>
            {filteredMedicines.map((el) => (
              <MedicinesForm key={el.id} el={el} />
            ))}
          </tbody>
        </table>
      </div>
      {medicines.map((el) => (
        <dialog
          key={el.id}
          id={`updateMedicine-form${el.id}`}
          className="modal"
          onClose={hdlClose}
        >
          <div className="modal-box rounded-lg">
            <EditMedicinePage resetForm={resetForm} el={el} />
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
          </div>
        </dialog>
      ))}
      <dialog id={`createMedicine-form`} className="modal" onClose={hdlClose}>
        <div className="modal-box rounded-lg">
          <CreateMedicinePage resetForm={resetForm} />
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
        </div>
      </dialog>
    </div>
  );
}

export default MedicinesListPage;
