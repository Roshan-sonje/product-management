import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="navbar navbar-dark bg-primary shadow-sm">
      <div className="container">
        <Link to="/" className="navbar-brand mb-0 h1 text-decoration-none">
          Product Manager
        </Link>
      </div>
    </nav>
  )
}

export default Navbar
