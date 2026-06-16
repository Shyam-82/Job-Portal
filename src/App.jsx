import "./App.css"
import Navbar from "./components/Navbar"
import Applications from "./pages/Applications"

import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Jobs from "./pages/Jobs"
import Profile from "./pages/Profile"
import SavedJobs from "./pages/SavedJobs"
import Admin from "./pages/Admin"

import { Routes, Route } from "react-router-dom"

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/savedjobs" element={<SavedJobs />} />
        <Route path="/applications" element={<Applications />}/>
        <Route path="/admin" element={<Admin />} 
        />
      </Routes>
    </>
  )
}

export default App