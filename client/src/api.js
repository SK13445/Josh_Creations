const base = import.meta.env.VITE_API_URL; // same-origin; vite proxy handles /api

function authHeaders() {
  const token = localStorage.getItem("jc_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function getHealth() {
  const res = await fetch(`${base}/api/health`);
  return res.json();
}

export async function getProjects() {
  const res = await fetch(`${base}/api/projects`);
  if (!res.ok) throw new Error("Failed to load projects");
  return res.json();
}

export async function submitInquiry(data) {
  const res = await fetch(`${base}/api/inquiry`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to submit inquiry");

  try {
    return await res.json();
  } catch {
    return { success: true };
  }
}

export async function adminLogin({ username, password }) {
  const res = await fetch(`${base}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) throw new Error("Invalid credentials");
  const data = await res.json();
  localStorage.setItem("jc_token", data.token);
  return data;
}

export async function createProject(formData) {
  try {
    const res = await fetch(`${base}/api/projects`, {
      method: "POST",
      headers: { ...authHeaders() },
      body: formData,
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("❌ Create project failed:", res.status, text);
      throw new Error(`Create failed (${res.status})`);
    }

    return await res.json();
  } catch (err) {
    console.error("❌ createProject() error:", err);
    throw err;
  }
}

export async function deleteProject(id) {
  const res = await fetch(`${base}/api/projects/${id}`, {
    method: "DELETE",
    headers: { ...authHeaders() },
  });
  if (!res.ok && res.status !== 204) throw new Error("Delete failed");
}
