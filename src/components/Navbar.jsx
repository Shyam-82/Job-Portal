import { Link } from "react-router-dom"

function Navbar() {

  const user = JSON.parse(
    localStorage.getItem("user")
  )

  const handleLogout = () => {

    localStorage.removeItem("user")

    alert("Logged Out Successfully")

    window.location.href = "/login"
  }

  return (
    <nav className="navbar">

      <h2 className="logo">
        Student Job Portal
      </h2>

      <ul className="nav-links">

        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/jobs">Jobs</Link>
        </li>

        {/* If NOT Logged In */}
        {!user && (
          <>
            <li>
              <Link to="/login">
                Student Login
              </Link>
            </li>

            <li>
              <Link to="/register">
                Register
              </Link>
            </li>

            <li>
              <Link to="/login">
                Admin Login
              </Link>
            </li>
          </>
        )}

        {/* Student */}
        {user?.role === "student" && (
          <>
            <li>
              <Link to="/profile">
                Profile
              </Link>
            </li>

            <li>
              <Link to="/applications">
                Applications
              </Link>
            </li>

            <li>
              <button
                className="logout-btn"
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
          </>
        )}

        {/* HR/Admin */}
        {user?.role === "hr" && (
          <>
            <li>
              <Link to="/admin">
                Admin
              </Link>
            </li>

            <li>
              <button
                className="logout-btn"
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
          </>
        )}

      </ul>

    </nav>
  )
}

export default Navbar