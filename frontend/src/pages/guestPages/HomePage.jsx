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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        <Link
          className="border rounded-xl p-6 text-center hover:shadow-md transition"
          to="/publicDoctor"
        >
          <h3 className="font-semibold text-lg mb-2">Our Doctors</h3>
          <p className="text-gray-600">Meet our experienced team of doctors.</p>
        </Link>
        <div className="border rounded-xl p-6 text-center hover:shadow-md transition">
          <h3 className="font-semibold text-lg mb-2">Our Services</h3>
          <p className="text-gray-600">
            Explore the various medical services we provide.
          </p>
        </div>
        <div className="border rounded-xl p-6 text-center hover:shadow-md transition">
          <h3 className="font-semibold text-lg mb-2">Contact Us</h3>
          <p className="text-gray-600">
            Get in touch with us for any inquiries or assistance.
          </p>
        </div>
      </div>
    </>
  );
}

export default HomePage;
