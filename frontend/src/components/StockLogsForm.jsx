import formatDate from "../utils/formatDate";

function StockLogsForm({ el }) {
  return (
    <tr>
      <td>{el.id}</td>
      <td>{el.change}</td>
      <td>{el.reason}</td>
      <td>{formatDate(el.changeAt)}</td>
      <td>{el.medicine.name}</td>
      <td
        className={`badge ${
          el.medicine?.form === "TABLET"
            ? "badge-primary"
            : el.medicine?.form === "SYRUP"
            ? "badge-secondary"
            : el.medicine?.form === "CAPSULE"
            ? "badge-warning"
            : el.medicine?.form === "INJECTION"
            ? "badge-info"
            : "badge-accent"
        } absolute mt-2.5`}
      >
        {el.medicine?.form}
      </td>
    </tr>
  );
}

export default StockLogsForm;
