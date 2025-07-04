import { useEffect, useState } from "react";
import useMedicineStore from "../../../stores/useMedicineStore";
import MedicinesForm from "../../../components/MedicinesForm";
import EditMedicinePage from "./EditMedicinePage";
import CreateMedicinePage from "./CreateMedicinePage";
<<<<<<< HEAD
=======
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
>>>>>>> c55d519 (second commit)

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
<<<<<<< HEAD
      <button
        className="absolute right-0 btn btn-active btn-lg"
        onClick={() => {
          document.getElementById("createMedicine-form").showModal();
        }}
      >
        Create new medicine
      </button>
      <div className="flex border p-2 rounded-xl shadow-md justify-around">
        <label className="font-bold">
          {" "}
          Search by name:
          <input
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            className="input input-accent mt-2"
            type="text"
            placeholder="Search"
          />
        </label>
        <label className="font-bold">
          {" "}
          Search by Form:
          <select
            className="select select-accent mt-2"
            value={searchForm}
            onChange={async (e) => {
              setSearchForm(e.target.value);
            }}
          >
            <option value="">All</option>
            <option value="TABLET">Tablet</option>
            <option value="SYRUP">Syrup</option>
            <option value="CAPSULE">Capsule</option>
            <option value="INJECTION">Injection</option>
            <option value="CREAM">Cream</option>
          </select>
        </label>
=======
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
>>>>>>> c55d519 (second commit)
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
<<<<<<< HEAD
      </dialog>{" "}
=======
      </dialog>
>>>>>>> c55d519 (second commit)
    </div>
  );
}

export default MedicinesListPage;
