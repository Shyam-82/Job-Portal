import BASE_URL from "./base";

/* APPLY JOB */
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

/* MY APPLICATIONS */
export const getMyApplications = async (token) => {
  const res = await fetch(`${BASE_URL}/applications/my`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
};