const API = "http://localhost:5000/api/auth";

export async function post(endpoint, data, token) {
  return fetch(`${API}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : ""
    },
    body: JSON.stringify(data)
  }).then(res => res.json());
}
console.log("API call:", endpoint, data);
export const API_BASE = "http://localhost:5000/api/auth";
function normalize(res) {
  if (!res.success) {
    throw new Error(res.message || "Request failed");
  }
  return res;
}

export async function post(endpoint, data, token) {
  try {
    const res = await fetch(`${API}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : ""
      },
      body: JSON.stringify(data)
    });

    return await res.json();
  } catch {
    return { success: false, message: "Network request failed" };
  }
}
