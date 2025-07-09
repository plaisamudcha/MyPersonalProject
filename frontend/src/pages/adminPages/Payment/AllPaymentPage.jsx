import { useEffect, useState } from "react";
import usePaymentStore from "../../../stores/usePaymentStore";
import SearchTextForm from "../../../components/SearchForm";
import PaymentForm from "./PaymentForm";

function AllPaymentPage() {
  const [patientSearch, setPatientSearch] = useState("");
  const payments = usePaymentStore((state) => state.payments);
  const getAllPayments = usePaymentStore((state) => state.getAllPayments);
  const [filteredPayments, setFilteredPayments] = useState([]);
  useEffect(() => {
    getAllPayments();
  }, []);
  useEffect(() => {
    const result = payments.filter((el) => {
      const patientName =
        `${el.patient?.user?.firstName} ${el.patient?.user?.lastName}`.toLowerCase();
      const matchPatient = patientName.includes(patientSearch.toLowerCase());
      return matchPatient;
    });
    setFilteredPayments(result);
  }, [payments, patientSearch]);
  return (
    <div>
      <div className="relative flex flex-col gap-7 overflow-auto">
        <h1 className="text-3xl font-bold text-center my-5">
          List of all payments : {filteredPayments.length}
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
            {filteredPayments.map((el) => (
              <PaymentForm key={el.id} el={el} />
            ))}
          </tbody>
        </table>
      </div>
      {/* <pre>{JSON.stringify(payments, null, 2)}</pre> */}
    </div>
  );
}

export default AllPaymentPage;
