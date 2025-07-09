import defaultImage from "../../../assets/defaultImage.jpg";

function PaymentForm({ el }) {
  const localDate = new Date(el.paidAt).toLocaleString("en-EN", {
    dateStyle: "long",
    timeZone: "Asia/Bangkok",
  });
  return (
    <tr>
      <td className="text-center">{el.id}</td>
      <td className="text-center">
        <div className="avatar">
          <div className="w-15 rounded-full">
            <img
              src={el.patient?.profileImage || defaultImage}
              alt="profileImage"
            />
          </div>
        </div>
      </td>
      <td className="text-center">
        {el.patient?.user?.firstName} {el.patient?.user?.lastName}
      </td>
      <td className="text-center">{localDate}</td>
      <td className="text-center">{el.paymentMethod}</td>
      <td className="text-center">
        <p
          className={`badge ${
            el.status === "PAID" ? "badge-success" : "badge-error"
          }`}
        >
          {el.status}
        </p>
      </td>
    </tr>
  );
}

export default PaymentForm;
