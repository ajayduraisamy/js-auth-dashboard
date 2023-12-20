export const API_BASE = "http://localhost:5000/api/auth";

export async function post(endpoint, data, token) {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : ""
    },
    body: JSON.stringify(data)
  });

  return await res.json();
}

export async function get(endpoint, token) {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return await res.json();
}
