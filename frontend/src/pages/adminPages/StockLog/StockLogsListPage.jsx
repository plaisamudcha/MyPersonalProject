import { useEffect, useState } from "react";
import useStockLogStore from "../../../stores/useStockLogStore";
import StockLogsForm from "../../../components/StockLogsForm";
import CreateStockLogPage from "./CreateStockLogPage";
<<<<<<< HEAD
=======
import CreateButton from "../../../components/CreateButton";
import SearchTextForm from "../../../components/SearchForm";
>>>>>>> c55d519 (second commit)

function StockLogsListPage() {
  const [resetForm, setResetForm] = useState(false);
  const [searchName, setSearchName] = useState("");
  const stockLogs = useStockLogStore((state) => state.stockLogs);
  const getAllStockLogs = useStockLogStore((state) => state.getAllStockLogs);
  useEffect(() => {
    getAllStockLogs();
  }, []);
  const [filteredStockLogs, setFilteredStockLogs] = useState([]);
  useEffect(() => {
    const result = stockLogs.filter((el) => {
      const medicineName = `${el.medicine.name}`.toLowerCase();
      const matchMedicine = medicineName.includes(searchName.toLowerCase());
      return matchMedicine;
    });
    setFilteredStockLogs(result);
  }, [searchName, stockLogs]);
  const hdlClose = () => {
    setResetForm((prv) => !prv);
  };
<<<<<<< HEAD
  const onSearch = async (e) => {
    e.preventDefault();
    await getAllStockLogs(search);
    setSearch("");
  };
=======
>>>>>>> c55d519 (second commit)
  return (
    <div className="relative flex flex-col gap-7 overflow-auto">
      <h1 className="text-3xl font-bold text-center">
        List of all stocklogs : {filteredStockLogs.length}
      </h1>
<<<<<<< HEAD
      <button
        className="absolute right-0 btn btn-active btn-lg"
        onClick={() => {
          document.getElementById("createStockLog-form").showModal();
        }}
      >
        Create new stocklog
      </button>
      <div className="flex border p-2 rounded-xl shadow-md justify-around">
        <form onSubmit={onSearch}>
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
        </form>
=======
      <CreateButton head="Create new stock-log" modalID="createStockLog-form" />
      <div className="flex border p-2 rounded-xl shadow-md justify-around">
        <SearchTextForm
          head="Search by name"
          search={searchName}
          setSearch={setSearchName}
        />
>>>>>>> c55d519 (second commit)
      </div>
      <div className="w-full ">
        <table className="table table-auto w-full">
          <thead>
            <tr>
              <th>Stock-log Id</th>
              <th>Change</th>
              <th>Reason</th>
              <th>ChangeAt</th>
              <th>Medicine name</th>
              <th>Medicine form</th>
            </tr>
          </thead>
          <tbody>
            {filteredStockLogs.map((el) => (
              <StockLogsForm key={el.id} el={el} />
            ))}
          </tbody>
        </table>
      </div>
      <dialog id={`createStockLog-form`} className="modal" onClose={hdlClose}>
        <div className="modal-box rounded-lg">
          <CreateStockLogPage resetForm={resetForm} />
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
        </div>
      </dialog>{" "}
    </div>
  );
}

export default StockLogsListPage;
