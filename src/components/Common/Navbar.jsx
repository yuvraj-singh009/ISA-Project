import { Link } from 'react-router-dom'
import { FaCalendarAlt, FaStar, FaHome, FaGlobeAmericas } from 'react-icons/fa'
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container container">
        <Link to="/" className="nav-logo">
          <FaGlobeAmericas className="nav-logo-icon" />
          <span className="nav-logo-text">ISL-SpacePOV</span>
        </Link>
        
        <div className="nav-links">
          <Link to="/" className="nav-link nav-link-home">
            <FaHome className="nav-link-icon" />
            <span>Home</span>
          </Link>
          <Link to="/events" className="nav-link nav-link-events">
            <FaCalendarAlt className="nav-link-icon" />
            <span>Events</span>
          </Link>
          <Link to="/sky" className="nav-link nav-link-sky">
            <FaStar className="nav-link-icon" />
            <span>Night Sky</span>
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar