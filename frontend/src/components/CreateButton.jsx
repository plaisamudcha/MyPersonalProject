function CreateButton({ head, setModal }) {
  return (
    <button
      className="absolute right-0 btn btn-active btn-lg"
      onClick={() => {
        setModal(true);
      }}
    >
      {head}
    </button>
  );
}

export default CreateButton;
