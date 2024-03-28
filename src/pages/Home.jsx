import image from "../assets/ai.png";
import { Link } from "react-router-dom";
import NavbarV2 from "../component/NavbarV2";

const Home = () => {
  const cekLogin = () => {
    return localStorage.getItem("urutanAkun") !== null ? true : false;
  }
  return (
    <div className="bg-white h-screen">
      <NavbarV2 /> 
      <div className="relative isolate px-6 pt-14 lg:px-8 flex items-center justify-center h-screen">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        <div className="mx-auto max-w-2xl flex items-center justify-center">
          <div className="text-center">
            <img
              className="mx-auto w-auto rounded-lg h-40 mt-[-40px]"
              src={image}
              alt="Your Company"
            />
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Find the Best Smartphone for You
            </h1>
            <p className="mt-5 text-lg leading-8 text-gray-700">
              Browse the List of Popular Smartphone Products and Compare the
              Specifications, Prices, and Benefits of Each to Find Your Best
              Choice
            </p>
            <div className="mt-5 flex items-center justify-center gap-x-6">
              <Link
                to="/login"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Get started
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
