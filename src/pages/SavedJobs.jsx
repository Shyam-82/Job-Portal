import { useEffect, useState } from "react";

function SavedJobs() {
  const BASE_URL = "https://job-portal-iwsq.onrender.com";

  const [savedJobs, setSavedJobs] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      return;
    }

    fetch(`${BASE_URL}/saved-jobs/${user.id}`)
      .then((res) => res.json())
      .then((data) => setSavedJobs(data))
      .catch((err) => console.log("Error fetching saved jobs:", err));
  }, []);

  return (
    <div className="saved-jobs-page">
      <h1>❤️ Saved Jobs</h1>

      <div className="saved-jobs-container">
        {savedJobs.length > 0 ? (
          savedJobs.map((job) => (
            <div className="saved-job-card" key={job.id}>
              <h2>{job.title}</h2>
              <h3>{job.company}</h3>
              <p>📍 {job.location}</p>
              <p>💰 {job.salary}</p>
            </div>
          ))
        ) : (
          <h2>No Saved Jobs Found</h2>
        )}
      </div>
    </div>
  );
}

export default SavedJobs;