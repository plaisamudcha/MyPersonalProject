import { useEffect, useState } from "react";
import useStockLogStore from "../../../stores/useStockLogStore";
import StockLogsForm from "../../../components/StockLogsForm";
import CreateButton from "../../../components/CreateButton";
import SearchTextForm from "../../../components/SearchForm";

function StockLogsListPage() {
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
  return (
    <div className="relative flex flex-col gap-7 overflow-auto">
      <h1 className="text-3xl font-bold text-center">
        List of all stocklogs : {filteredStockLogs.length}
      </h1>
      <div className="flex border p-2 rounded-xl shadow-md justify-around">
        <SearchTextForm
          head="Search by Medicine name"
          search={searchName}
          setSearch={setSearchName}
        />
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

      {/* <pre>{JSON.stringify(stockLogs, null, 2)}</pre> */}
    </div>
  );
}

export default StockLogsListPage;
