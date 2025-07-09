import { Link } from "react-router";

function HomePage() {
  return (
    <>
      <div className="text-center w-screen mx-auto mb-16 mt-25">
        <h2 className="text-6xl font-bold mb-4">Providing Quality</h2>
        <h2 className="text-6xl font-bold mb-7">Healthcare</h2>
        <p className="text-gray-600 text-2xl text-shadow-xs">
          We offer a wide range of medical services to
        </p>
        <p className="text-gray-600 mb-10 text-2xl text-shadow-xs">
          ensure the well-being of our patients.
        </p>
        <div className="flex gap-5 justify-center">
          <Link
            to="/register/patient"
            className="btn btn-accent btn-lg rounded-xl"
          >
            Register to be our patient
          </Link>
          <Link to="/login" className="btn btn-accent btn-lg rounded-xl">
            Login to manage your appointment
          </Link>
        </div>
      </div>
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto grid gap-6 md:grid-cols-3">
          <div className="card bg-base-200 shadow-md">
            <div className="card-body text-center">
              <h2 className="card-title justify-center">Our Doctors</h2>
              <p>Meet our experienced team of doctors.</p>
            </div>
          </div>
          <div className="card bg-base-200 shadow-md">
            <div className="card-body text-center">
              <h2 className="card-title justify-center">Our Services</h2>
              <p>Explore the various medical services we provide.</p>
            </div>
          </div>
          <div className="card bg-base-200 shadow-md">
            <div className="card-body text-center">
              <h2 className="card-title justify-center">Contact Us</h2>
              <p>Get in touch with us for any inquiries or assistance.</p>
            </div>
          </div>
        </div>
      </section>{" "}
    </>
  );
}

export default HomePage;
