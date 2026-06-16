import { useEffect, useState } from "react"

function Applications() {

  const [applications, setApplications] = useState([])

  useEffect(() => {

    const user = JSON.parse(
      localStorage.getItem("user")
    )

    fetch(
      `http://localhost:8000/my-applications/${user.id}`
    )
      .then(res => res.json())
      .then(data => setApplications(data))

  }, [])

  return (
    <div className="applications-page">

      <h1>📋 My Applications</h1>

      <div className="applications-container">

        {applications.map((app) => (

          <div
            className="application-card"
            key={app.id}
          >

            <h2>{app.title}</h2>

            <h3>{app.company}</h3>

            <p>📍 {app.location}</p>

            <p className="status">
              Status: {app.status}
            </p>

          </div>

        ))}

      </div>

    </div>
  )
}

export default Applications