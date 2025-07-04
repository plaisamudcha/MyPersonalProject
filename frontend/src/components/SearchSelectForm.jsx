function SearchSelectForm({ head, statusFilter, setStatusFilter, array }) {
  return (
    <label className="font-bold">
      {" "}
      {head}
      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        className="select select-accent mt-2"
      >
        {array.map((el) => (
          <option key={el.id} value={el.value}>
            {el.name}
          </option>
        ))}
      </select>
    </label>
  );
}

export default SearchSelectForm;
