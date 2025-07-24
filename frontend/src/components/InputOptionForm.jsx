function InputOptionForm({ label, name, register, array, errors }) {
  return (
    <div className="flex-1">
      <label className="block mb-1 font-medium">
        {" "}
        {label}
        <select
          {...register}
          className="w-full border px-3 py-2 rounded-md input input-accent"
        >
          <option value="" disabled>
            Select...
          </option>
          {array.map((el) => (
            <option key={el.id} value={el.value}>
              {`${el.value} ${el.name || ""} ${el.stock ? "stock :" : ""} ${
                el.stock || ""
              }`}
            </option>
          ))}
        </select>
      </label>
      {errors[name] && (
        <p className="text-sm text-red-400">{errors[name]?.message}</p>
      )}
    </div>
  );
}

export default InputOptionForm;
