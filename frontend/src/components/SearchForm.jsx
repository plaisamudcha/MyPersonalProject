function SearchTextForm({ head, search, setSearch, type = "text" }) {
  return (
    <label className="font-bold">
      {" "}
      {head}
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="input input-accent mt-2"
        type={type}
        placeholder="Search"
      />
    </label>
  );
}

export default SearchTextForm;
