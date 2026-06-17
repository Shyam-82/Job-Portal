// src/api/applicationApi.js

const BASE_URL = "https://job-portal-iwsq.onrender.com";

/* ---------------- APPLY FOR JOB ---------------- */
export const applyForJob = async (jobId, token) => {
  const res = await fetch(`${BASE_URL}/applications/apply`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ jobId }),
  });

  return res.json();
};

/* ---------------- GET MY APPLICATIONS ---------------- */
export const getMyApplications = async (token) => {
  const res = await fetch(`${BASE_URL}/applications/my`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
};

/* ---------------- GET ALL APPLICATIONS (ADMIN) ---------------- */
export const getAllApplications = async (token) => {
  const res = await fetch(`${BASE_URL}/applications`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
};