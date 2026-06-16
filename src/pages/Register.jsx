import { useState } from "react"

function Register() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    skills: "",
    password: ""
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async () => {

    const response = await fetch(
      "http://127.0.0.1:8000/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      }
    )

    const data = await response.json()

    alert(data.message)

    if (data.message === "User Registered Successfully") {
      window.location.href = "/login"
    }
  }

  return (
    <div className="form-container">

      <div className="form-box">

        <h1>Create Account</h1>

        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          onChange={handleChange}
        />

        <input
          type="text"
          name="skills"
          placeholder="Enter Skills"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          onChange={handleChange}
        />

        <button onClick={handleSubmit}>
          Register
        </button>

      </div>

    </div>
  )
}

export default Register