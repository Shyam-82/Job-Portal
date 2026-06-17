// src/api/jobsApi.js

const BASE_URL = "https://job-portal-iwsq.onrender.com";
// 👆 REPLACE this with your actual Render backend URL

// GET all jobs
export const getJobs = async () => {
  const res = await fetch(`${BASE_URL}/jobs`);
  return res.json();
};

// GET single job by id
export const getJobById = async (id) => {
  const res = await fetch(`${BASE_URL}/jobs/${id}`);
  return res.json();
};

// CREATE job (admin)
export const createJob = async (jobData, token) => {
  const res = await fetch(`${BASE_URL}/jobs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(jobData),
  });

  return res.json();
};

// APPLY for job
export const applyJob = async (jobId, token) => {
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