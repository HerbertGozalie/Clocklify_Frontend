import logo from "../assets/images/Logo.png";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <>
      <nav className="text-white lg:px-123 md:px-76 py-35 px-20 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/timer" className="cursor-pointer">
            <img src={logo} alt="clocklify logo" />
          </Link>
        </div>

        <div className="flex max-md:space-x-20 sm:px-20 space-x-90 pl-20">
          <Link to="/timer" className="hover:opacity-90">
            TIMER
          </Link>
          <Link to="/activity" className="hover:opacity-90">
            ACTIVITY
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
