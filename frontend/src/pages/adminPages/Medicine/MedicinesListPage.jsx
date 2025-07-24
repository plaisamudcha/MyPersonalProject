import { useEffect, useState } from "react";
import useMedicineStore from "../../../stores/useMedicineStore";
import MedicinesForm from "../../../components/MedicinesForm";
import EditMedicinePage from "./EditMedicinePage";
import CreateMedicinePage from "./CreateMedicinePage";
import CreateButton from "../../../components/CreateButton";
import SearchTextForm from "../../../components/SearchForm";
import SearchSelectForm from "../../../components/SearchSelectForm";
import PageButton from "../../../components/PageButton";

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
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(null);
  const [page, setPage] = useState(1);
  const limit = 6;
  const totalData = useMedicineStore((state) => state.totalData);
  const totalPage = Math.ceil(totalData / limit);
  const medicines = useMedicineStore((state) => state.medicines);
  const getAllMedicines = useMedicineStore((state) => state.getAllMedicines);

  useEffect(() => {
    getAllMedicines(page, limit, searchName, searchForm);
  }, [page, searchName, searchForm]);
  useEffect(() => {
    if (isOpenModal) {
      document.getElementById("createMedicine-form")?.showModal();
    }
    if (isOpenEdit) {
      document.getElementById(`updateMedicine-form${isOpenEdit}`).showModal();
    }
  }, [isOpenModal, isOpenEdit]);
  const hdlClose = () => {
    setIsOpenModal(false);
    setIsOpenEdit(null);
    setResetForm((prv) => !prv);
  };
  return (
    <div className="relative flex flex-col gap-7 overflow-auto">
      <h1 className="text-3xl font-bold text-center">
        List of all medicines : {totalData}
      </h1>
      <CreateButton head="Create new medicine" setModal={setIsOpenModal} />
      <div className="flex border p-2 rounded-xl shadow-md justify-around">
        <SearchTextForm
          head="Search by medicine's name1"
          search={searchName}
          setSearch={setSearchName}
        />
        <SearchSelectForm
          head="Sarch by medicine's form"
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
              <th>name1</th>
              <th>description</th>
              <th>stock</th>
              <th>price per unit</th>
              <th>form</th>
              <th>Edit medicine</th>
            </tr>
          </thead>
          <tbody>
            {medicines.length !== 0 ? (
              medicines.map((el) => (
                <MedicinesForm
                  key={el.id}
                  el={el}
                  setIsOpenEdit={setIsOpenEdit}
                />
              ))
            ) : (
              <td colSpan={9} className="text-xl text-center text-gray-500">
                Don't have information
              </td>
            )}
          </tbody>
        </table>
      </div>
      {medicines.length !== 0 ? (
        <PageButton page={page} setPage={setPage} totalPage={totalPage} />
      ) : (
        ""
      )}

      {medicines.map((el) =>
        isOpenEdit === el.id ? (
          <dialog
            key={el.id}
            id={`updateMedicine-form${el.id}`}
            className="modal"
            onClose={hdlClose}
          >
            <div className="modal-box rounded-lg">
              <EditMedicinePage
                resetForm={resetForm}
                el={el}
                page={page}
                limit={limit}
                form={form}
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
      {isOpenModal && (
        <dialog id={`createMedicine-form`} className="modal" onClose={hdlClose}>
          <div className="modal-box rounded-lg">
            <CreateMedicinePage
              resetForm={resetForm}
              page={page}
              limit={limit}
              form={form}
            />
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
          </div>
        </dialog>
      )}
    </div>
  );
}

export default MedicinesListPage;
