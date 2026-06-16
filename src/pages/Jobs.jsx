import { useEffect, useState } from "react"
import JobCard from "../components/JobCard"

function Jobs() {

  const [jobs, setJobs] = useState([])

  useEffect(() => {

    const user = JSON.parse(
      localStorage.getItem("user")
    )

    if (!user) {
      alert("Please login first")
      window.location.href = "/login"
      return
    }

    fetch(
      `http://127.0.0.1:8000/jobs/${user.id}`
    )
      .then((response) => response.json())
      .then((data) => {
        setJobs(data)
      })
      .catch((error) => {
        console.log(error)
      })

  }, [])

  return (
    <div className="jobs-page">

      <h1>Recommended Jobs</h1>

      <div className="jobs-container">

        {jobs.length > 0 ? (
          jobs.map((job) => (
            <JobCard
              key={job.id}
              id={job.id}
              company={job.company}
              role={job.title}
              location={job.location}
              salary={job.salary}
              compatibility={job.compatibility}
            />
          ))
        ) : (
          <h2>No Jobs Found</h2>
        )}

      </div>

    </div>
  )
}

export default Jobs