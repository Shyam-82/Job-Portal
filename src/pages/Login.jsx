const handleLogin = async () => {
  try {
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

    console.log("Login Response:", data);

    if (response.ok && data.user) {

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      alert("Login Successful");

      if (data.user.role === "hr") {
        window.location.href = "/admin";
      } else {
        window.location.href = "/profile";
      }

    } else {
      alert(data.message || "Login Failed");
    }

  } catch (error) {
    console.error(error);
    alert("Server Error");
  }
};