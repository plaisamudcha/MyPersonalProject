function StockLogsForm({ el }) {
  const localDate = new Date(el.changeAt).toLocaleString("en-EN", {
    dateStyle: "long",
    timeZone: "Asia/Bangkok",
  });

  return (
    <tr>
      <td>{el.id}</td>
      <td>{el.change}</td>
      <td>{el.reason}</td>
      <td>{localDate}</td>
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
