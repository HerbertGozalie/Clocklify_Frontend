import { useNavigate } from "react-router-dom";
import logo from "../assets/images/Logo.png";
import { useEffect } from "react";

const LandingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/signin");
    }, 2000);
  });

  return (
    <>
      <div className="min-h-screen flex items-center justify-center ">
        <img src={logo} alt="Clocklify Logo" className="h-50" />
      </div>
    </>
  );
};

export default LandingPage;
