import { Link } from "react-router-dom";
function Navbar() {
  let user = null;

  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch {
    user = null;
  }
  const handleLogout = () => {
    localStorage.removeItem("user");

    alert("Logged Out Successfully");

    window.location.href = "/login";
  };

  return (
    <nav className="navbar">
      <h2 className="logo">Student Job Portal</h2>

      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/jobs">Jobs</Link>
        </li>

        {!user && (
          <>
            <li>
              <Link to="/login">Student Login</Link>
            </li>

            <li>
              <Link to="/register">Register</Link>
            </li>

            <li>
              <Link to="/login">Admin Login</Link>
            </li>
          </>
        )}

        {user?.role === "student" && (
          <>
            <li>
              <Link to="/profile">Profile</Link>
            </li>

            <li>
              <Link to="/applications">Applications</Link>
            </li>

            <li>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </>
        )}

        {user?.role === "admin" && (
          <>
            <li>
              <Link to="/admin">Admin</Link>
            </li>

            <li>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
