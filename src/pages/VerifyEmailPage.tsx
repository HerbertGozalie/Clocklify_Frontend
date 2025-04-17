import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
// import { API_URL_DEV } from "../config";
import { API_URL } from "../config"; //=> for debugging purposes

const VerifyUserEmail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isVerified, setisVerified] = useState<boolean>(false);

  useEffect(() => {
    const handleVerify = async () => {
      try {
        const params = new URLSearchParams(location.search);
        const emailToken = params.get("emailToken");
        const response = await axios.patch(
          `${API_URL}/api/v1/user/verifyemail`, //=> for debugging purposes
          // `${API_URL_DEV}/api/v1/user/verifyemail`,
          {
            emailToken: emailToken,
          }
        );

        if (response.data.status === "Success") {
          setisVerified(true);
        }

        console.log(response);

        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } catch (error) {
        console.log(error);
      }
    };
    handleVerify();
  }, [location.search, navigate]);

  return (
    <div>
      {isVerified ? (
        <h1>Your email has been verified</h1>
      ) : (
        <h1>Verifying your email...</h1>
      )}
    </div>
  );
};

export default VerifyUserEmail;
