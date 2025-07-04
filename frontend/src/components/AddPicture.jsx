import { Image } from "lucide-react";

function AddPicture({ file, setFile }) {
  const hdlFileChange = (e) => {
    // console.dir(e.target.files[0]);
    // console.log(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
  };
  const removePic = (e) => {
    e.stopPropagation();
    document.getElementById("input-file").value = "";
    setFile("");
  };
  return (
    <div className="flex flex-col p-2 border rounded-lg ">
      <div
        className="bg-slate-100 min-h-40 relative cursor-pointer hover:bg-slate-200"
        onClick={() => document.getElementById("input-file").click()}
      >
        <input
          type="file"
          className="hidden"
          id="input-file"
          onChange={hdlFileChange}
        />
        {file && (
          <>
            <img
              src={URL.createObjectURL(file)}
              alt="post-image"
              className="h-full block mx-auto"
            />
            <button
              onClick={removePic}
              className="btn btn-sm btn-circle btn-error absolute top-2 right-2"
            >
              X
            </button>
          </>
        )}
        {!file && (
          <Image
            size={70}
            className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2"
          />
        )}
      </div>
    </div>
  );
}
export default AddPicture;
