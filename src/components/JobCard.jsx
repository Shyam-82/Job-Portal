function JobCard({
  id,
  company,
  title,
  location,
  salary,
  compatibility
}) {

  const applyJob = async () => {

    const user = JSON.parse(
      localStorage.getItem("user")
    )

    if (!user) {
      alert("Please Login First")
      return
    }

    const response = await fetch(
      "http://localhost:8000/apply-job",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          user_id: user.id,
          job_id: id
        })
      }
    )

    const data = await response.json()

    alert(data.message)
  }

  return (
    <div className="job-card">

      <h2>{company}</h2>

      <h3>{title}</h3>

      <p>{location}</p>

      <p>{salary}</p>

      <p>
        Compatibility: {compatibility}%
      </p>

      <button onClick={applyJob}>
        Apply Now
      </button>

    </div>
  )
}

export default JobCard