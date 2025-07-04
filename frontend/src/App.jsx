import { Slide, ToastContainer } from "react-toastify";
import AppRouter from "./routes/AppRouter";

function App() {
  return (
    <>
      <AppRouter />
      <ToastContainer
        position="bottom-right"
        autoClose={1500}
        transition={Slide}
      />
    </>
  );
}

export default App;
