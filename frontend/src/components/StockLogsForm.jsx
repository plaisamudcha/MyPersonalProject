function StockLogsForm({ el }) {
<<<<<<< HEAD
=======
  const localDate = new Date(el.changeAt).toLocaleString("en-EN", {
    dateStyle: "long",
    timeZone: "Asia/Bangkok",
  });

>>>>>>> c55d519 (second commit)
  return (
    <tr>
      <td>{el.id}</td>
      <td>{el.change}</td>
      <td>{el.reason}</td>
<<<<<<< HEAD
      <td>{el.changeAt}</td>
=======
      <td>{localDate}</td>
>>>>>>> c55d519 (second commit)
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
<<<<<<< HEAD
        } mt-5 cursor-pointer`}
=======
        } absolute mt-2.5`}
>>>>>>> c55d519 (second commit)
      >
        {el.medicine?.form}
      </td>
    </tr>
  );
}

export default StockLogsForm;
