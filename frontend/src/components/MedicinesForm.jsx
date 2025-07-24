function MedicinesForm({ el, setIsOpenEdit }) {
  return (
    <tr>
      <td>{el.id}</td>
      <td>{el.name}</td>
      <td>{el.description}</td>
      <td>{el.stock}</td>
      <td>{el.pricePerUnit}</td>
      <td
        className={`badge ${
          el.form === "TABLET"
            ? "badge-primary"
            : el.form === "SYRUP"
            ? "badge-secondary"
            : el.form === "CAPSULE"
            ? "badge-warning"
            : el.form === "INJECTION"
            ? "badge-info"
            : "badge-accent"
        } mt-5 cursor-pointer`}
      >
        {el.form}
      </td>
      <td>
        <div className="flex gap-2">
          <button
            className="btn btn-neutral "
            onClick={() => setIsOpenEdit(el.id)}
          >
            Edit
          </button>
        </div>
      </td>
    </tr>
  );
}

export default MedicinesForm;
