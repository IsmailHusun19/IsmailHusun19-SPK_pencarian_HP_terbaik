import { Link } from "react-router-dom";
import Logo from "../assets/ai.png";

const Footer = () => {
  return (
    <div className=" bg-slate-900">
      <footer className="w-full px-6 bg-slate-950">
        <div className="flex flex-row flex-wrap items-center justify-center text-center text-slate-200 gap-y-6 gap-x-12 md:justify-between py-10 bg-slate-950">
          <img src={Logo} alt="logo-ct" className="w-40" />
          <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
            <li>
              <Link
                to="/dashboard"
                className="block font-sans text-base antialiased font-normal leading-relaxed transition-colors text-blue-gray-900 hover:text-blue-500 focus:text-blue-500"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/team"
                className="block font-sans text-base antialiased font-normal leading-relaxed transition-colors text-blue-gray-900 hover:text-blue-500 focus:text-blue-500"
              >
                Team
              </Link>
            </li>
            <li>
              <Link
                to="aboutus"
                className="block font-sans text-base antialiased font-normal leading-relaxed transition-colors text-blue-gray-900 hover:text-blue-500 focus:text-blue-500"
              >
                About Us
              </Link>
            </li>
          </ul>
        </div>
        <span className="block mt-3 border-t border-blue-gray-50" />
        <p className="block font-sans text-base antialiased font-normal leading-relaxed text-center text-slate-400 py-4">
          ©Kelompok3
        </p>
      </footer>
    </div>
  );
};

export default Footer;
