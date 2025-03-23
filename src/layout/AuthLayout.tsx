import { Outlet } from "react-router-dom"
import logo from "../assets/images/Logo.png"

const AuthLayout = () => {
  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center text-white">
        <div className="mb-[7rem]">
          <img
            src={logo}
            alt="Clocklify Logo"
            className="h-50"
          />
        </div>
        <Outlet/>
      </div>
    </>
  )
}

export default AuthLayout
