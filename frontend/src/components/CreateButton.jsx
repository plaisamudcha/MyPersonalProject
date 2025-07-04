function CreateButton({ head, modalID }) {
  return (
    <button
      className="absolute right-0 btn btn-active btn-lg"
      onClick={() => {
        document.getElementById(modalID).showModal();
      }}
    >
      {head}
    </button>
  );
}

export default CreateButton;
