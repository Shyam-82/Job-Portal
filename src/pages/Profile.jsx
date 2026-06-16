import { useEffect, useState } from "react"

function Profile() {

  const [user, setUser] = useState(null)

  useEffect(() => {
    const storedUser = JSON.parse(
      localStorage.getItem("user")
    )

    setUser(storedUser)
  }, [])

  if (!user) {
    return <h2>Loading...</h2>
  }

  return (
    <div className="profile-dashboard">

      <div className="profile-banner">

        <div className="profile-avatar">
          {user.name.charAt(0).toUpperCase()}
        </div>

        <div>
          <h1>{user.name}</h1>
          <p>{user.email}</p>
        </div>

      </div>

      <div className="profile-grid">

        <div className="profile-box">
          <h3>🚀 Skills</h3>
          <p>{user.skills}</p>
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
          <h2>5</h2>
          <p>Jobs Applied</p>
        </div>

        <div className="profile-box">
          <h3>❤️ Saved Jobs</h3>
          <h2>3</h2>
          <p>Bookmarked</p>
        </div>

      </div>

    </div>
  )
}

export default Profile