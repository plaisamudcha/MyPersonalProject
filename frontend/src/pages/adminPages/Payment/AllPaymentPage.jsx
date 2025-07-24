import { useEffect, useState } from "react";
import usePaymentStore from "../../../stores/usePaymentStore";
import SearchTextForm from "../../../components/SearchForm";
import PaymentForm from "./PaymentForm";
import PageButton from "../../../components/PageButton";

function AllPaymentPage() {
  const [patientSearch, setPatientSearch] = useState("");
  const [page, setPage] = useState(1);
  const limit = 6;
  const totalData = usePaymentStore((state) => state.totalData);
  const totalPage = Math.ceil(totalData / limit);
  const payments = usePaymentStore((state) => state.payments);
  const getAllPayments = usePaymentStore((state) => state.getAllPayments);
  useEffect(() => {
    getAllPayments(page, limit, patientSearch);
  }, [page, patientSearch]);
  return (
    <div>
      <div className="relative flex flex-col gap-7">
        <h1 className="text-3xl font-bold text-center my-5">
          List of all payments : {totalData}
        </h1>
      </div>
      <div className="flex border p-2 rounded-xl shadow-md justify-around">
        <SearchTextForm
          head="Search by patient"
          search={patientSearch}
          setSearch={setPatientSearch}
        />
      </div>
      <div className="w-full">
        <table className="table table-auto w-full">
          <thead>
            <tr>
              <th className="text-center">Payment ID</th>
              <th className="text-center">Patient</th>
              <th className="text-center">Patient name</th>
              <th className="text-center">Paid at</th>
              <th className="text-center">Payment method</th>
              <th className="text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.length !== 0 ? (
              payments.map((el) => <PaymentForm key={el.id} el={el} />)
            ) : (
              <td colSpan={9} className="text-xl text-center text-gray-500">
                Don't have information
              </td>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center">
        {payments.length !== 0 ? (
          <PageButton page={page} setPage={setPage} totalPage={totalPage} />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default AllPaymentPage;
