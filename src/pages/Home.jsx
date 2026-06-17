import { useEffect, useState } from "react";
import jobs from "../data/jobs";
import JobCard from "../components/JobCard";

function Home() {
  const BASE_URL = "https://job-portal-iwsq.onrender.com";

  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch(`${BASE_URL}/api/message`)
      .then((response) => response.json())
      .then((data) => {
        setMessage(data.message);
      })
      .catch((err) => console.log("Error fetching message:", err));
  }, []);

  return (
    <div className="hero">
      <h1>Find Your Dream Job</h1>

      <p>{message}</p>

      <button>Explore Jobs</button>

      <div className="jobs-container">
        {jobs.map((job) => (
          <JobCard
            key={job.id}
            company={job.company}
            role={job.role}
            location={job.location}
            salary={job.salary}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;