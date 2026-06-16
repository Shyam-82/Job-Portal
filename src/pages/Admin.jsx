import { Navigate } from "react-router-dom"

function Admin() {

  const [applications, setApplications] = useState([])

  const fetchApplications = () => {

    fetch(
      "http://localhost:5000/all-applications"
    )
      .then(res => res.json())
      .then(data => setApplications(data))
  }

  useEffect(() => {
    fetchApplications()
  }, [])

  const updateStatus = async (
    id,
    status
  ) => {

    await fetch(
      "http://localhost:5000/update-status",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          application_id: id,
          status: status
        })
      }
    )

    fetchApplications()
  }

  return (
    <div className="admin-page">

      <h1>Admin Dashboard</h1>

      {applications.map((app) => (

        <div
          className="admin-card"
          key={app.id}
        >

          <h2>{app.name}</h2>

          <p>{app.email}</p>

          <p>{app.title}</p>

          <p>
            Status:
            {app.status}
          </p>

          <button
            onClick={() =>
              updateStatus(
                app.id,
                "Shortlisted"
              )
            }
          >
            Shortlist
          </button>

          <button
            onClick={() =>
              updateStatus(
                app.id,
                "Rejected"
              )
            }
          >
            Reject
          </button>

        </div>

      ))}

    </div>
  )
}

export default Admin