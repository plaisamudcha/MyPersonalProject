import { useEffect, useState } from "react";
import useStockLogStore from "../../../stores/useStockLogStore";
import StockLogsForm from "../../../components/StockLogsForm";
import SearchTextForm from "../../../components/SearchForm";
import PageButton from "../../../components/PageButton";

function StockLogsListPage() {
  const [searchName, setSearchName] = useState("");
  const [page, setPage] = useState(1);
  const limit = 6;
  const totalData = useStockLogStore((state) => state.totalData);
  const totalPage = Math.ceil(totalData / limit);
  const stockLogs = useStockLogStore((state) => state.stockLogs);
  const getAllStockLogs = useStockLogStore((state) => state.getAllStockLogs);
  useEffect(() => {
    getAllStockLogs(page, limit, searchName);
  }, [page, searchName]);
  return (
    <div className="relative flex flex-col gap-7 overflow-auto">
      <h1 className="text-3xl font-bold text-center">
        List of all stocklogs : {totalData}
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
            {stockLogs.length !== 0 ? (
              stockLogs.map((el) => <StockLogsForm key={el.id} el={el} />)
            ) : (
              <td colSpan={9} className="text-xl text-center text-gray-500">
                Don't have information
              </td>
            )}
          </tbody>
        </table>
      </div>
      {stockLogs.length !== 0 ? (
        <PageButton page={page} setPage={setPage} totalPage={totalPage} />
      ) : (
        ""
      )}
    </div>
  );
}

export default StockLogsListPage;
