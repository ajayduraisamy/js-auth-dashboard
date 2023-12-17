export async function get(url, token) {
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return await res.json();
}
