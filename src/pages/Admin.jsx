import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

function Admin() {
  const BASE_URL = "https://job-portal-iwsq.onrender.com";

  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || user.role !== "hr") {
    return <Navigate to="/" />;
  }

  const [applications, setApplications] = useState([]);

  const fetchApplications = () => {
    fetch(`${BASE_URL}/applications/all/${user.id}`)
      .then((res) => res.json())
      .then((data) => setApplications(data))
      .catch((err) => console.log("Error fetching applications:", err));
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const updateStatus = async (id, status) => {
    await fetch(`${BASE_URL}/applications/update-status`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        application_id: id,
        status: status,
      }),
    });

    fetchApplications();
  };

  return (
    <div className="admin-page">
      <h1>HR Recruitment Dashboard</h1>

      {applications.length === 0 ? (
        <h2>No Applications Yet</h2>
      ) : (
        applications.map((app) => (
          <div className="admin-card" key={app.id}>
            <h2>👨‍🎓 {app.name}</h2>

            <p>📧 {app.email}</p>

            <p>💼 {app.title}</p>

            <p>
              Status: <b>{app.status}</b>
            </p>

            <div className="admin-buttons">
              <button
                className="shortlist-btn"
                onClick={() => updateStatus(app.id, "Shortlisted")}
              >
                Shortlist
              </button>

              <button
                className="reject-btn"
                onClick={() => updateStatus(app.id, "Rejected")}
              >
                Reject
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Admin;