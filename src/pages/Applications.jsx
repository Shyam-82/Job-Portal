import { useEffect, useState } from "react";

function Applications() {
  const BASE_URL = "https://job-portal-iwsq.onrender.com";

  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) return;

    fetch(`${BASE_URL}/applications/my/${user.id}`)
      .then((res) => res.json())
      .then((data) => setApplications(data))
      .catch((err) => console.log("Error fetching applications:", err));
  }, []);

  return (
    <div className="applications-page">
      <h1>📋 My Applications</h1>

      <div className="applications-container">
        {applications.length === 0 ? (
          <p>No applications found.</p>
        ) : (
          applications.map((app) => (
            <div className="application-card" key={app.id}>
              <h2>{app.title}</h2>
              <h3>{app.company}</h3>

              <p>📍 {app.location}</p>

              <p className="status">
                Status: <b>{app.status}</b>
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Applications;