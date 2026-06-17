// src/api/profileApi.js

const BASE_URL = "https://job-portal-iwsq.onrender.com";

/* ---------------- GET PROFILE ---------------- */
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

/* ---------------- UPDATE PROFILE ---------------- */
export const updateProfile = async (profileData, token) => {
  const res = await fetch(`${BASE_URL}/profile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(profileData),
  });

  return res.json();
};