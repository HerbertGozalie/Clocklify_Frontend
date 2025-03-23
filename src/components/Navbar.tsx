import logo from '../assets/images/Logo.png'
import { Link } from 'react-router-dom'
const Navbar = () => {
  return (
    <>
      <nav className='text-white lg:px-136 md:px-89 py-48 flex items-center justify-between'>
        <div className='flex items-center'>
          <img src={logo} alt="clocklify logo" />
        </div>

        <div className='flex space-x-90 px-20'>
          <Link 
            to="/timer"
          >
            TIMER
          </Link>
          <Link
            to="/activity"
          >
            ACTIVITY
          </Link>
        </div>
      </nav>
    </>
  )
}

export default Navbar
