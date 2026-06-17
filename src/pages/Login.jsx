import { useState } from "react"

function Login() {

  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  })

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    })
  }

 const handleLogin = async () => {
  const response = await fetch(
    "https://job-portal-iwsq.onrender.com/auth/login",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(loginData)
    }
  );

  const data = await response.json();

  if (data.message === "Login Successful") {
    localStorage.setItem("user", JSON.stringify(data.user));

    if (data.user.role === "hr") {
      window.location.href = "/admin";
    } else {
      window.location.href = "/profile";
    }
  } else {
    alert(data.message);
  }
};

  return (
    <div className="form-container">

      <div className="form-box">

        <h1>Login</h1>

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          onChange={handleChange}
        />

        <button onClick={handleLogin}>
          Login
        </button>

      </div>

    </div>
  )
}

export default Login