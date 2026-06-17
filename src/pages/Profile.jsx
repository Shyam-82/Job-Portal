import { useEffect, useState } from "react";

function Profile() {
  const BASE_URL = "https://job-portal-iwsq.onrender.com";

  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    applications: 0,
    saved: 0,
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) return;

    setUser(storedUser);

    // OPTIONAL: fetch real stats from backend
    fetch(`${BASE_URL}/profile/stats/${storedUser.id}`)
      .then((res) => res.json())
      .then((data) => {
        setStats({
          applications: data.applications || 0,
          saved: data.saved || 0,
        });
      })
      .catch(() => {
        // fallback if backend doesn't support it
        setStats({
          applications: 0,
          saved: 0,
        });
      });
  }, []);

  if (!user) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="profile-dashboard">
      <div className="profile-banner">
        <div className="profile-avatar">
          {user.name?.charAt(0)?.toUpperCase()}
        </div>

        <div>
          <h1>{user.name}</h1>
          <p>{user.email}</p>
        </div>
      </div>

      <div className="profile-grid">
        <div className="profile-box">
          <h3>🚀 Skills</h3>
          <p>{user.skills || "No skills added"}</p>
        </div>

        <div className="profile-box">
          <h3>📊 Profile Strength</h3>
          <div className="strength-bar">
            <div className="strength-fill"></div>
          </div>
          <p>80% Complete</p>
        </div>

        <div className="profile-box">
          <h3>💼 Applications</h3>
          <h2>{stats.applications}</h2>
          <p>Jobs Applied</p>
        </div>

        <div className="profile-box">
          <h3>❤️ Saved Jobs</h3>
          <h2>{stats.saved}</h2>
          <p>Bookmarked</p>
        </div>
      </div>
    </div>
  );
}

export default Profile;