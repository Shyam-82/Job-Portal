// src/api/authApi.js

const BASE_URL = "https://job-portal-iwsq.onrender.com";

/* ---------------- REGISTER ---------------- */
export const registerUser = async (userData) => {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  return res.json();
};

/* ---------------- LOGIN ---------------- */
export const loginUser = async (userData) => {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  return res.json();
};

/* ---------------- GET CURRENT USER ---------------- */
export const getProfile = async (token) => {
  const res = await fetch(`${BASE_URL}/profile`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
};