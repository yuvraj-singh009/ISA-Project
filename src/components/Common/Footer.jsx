import "./Footer.css";


const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container container">
        <div className="mb-4 md:mb-0">
          <p className="text-gray-400">
            © {new Date().getFullYear()} India Space Academy
          </p>
        </div>
        <div className="footer-links">
          <a href="#" className="footer-link">Terms</a>
          <a href="#" className="footer-link">Privacy</a>
          <a href="Contact.html" className="footer-link">Contact</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer