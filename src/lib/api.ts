// const BASE_URL = "http://localhost:5000";
const BASE_URL ="https://sih-2025-l3ur.onrender.com"; // production

export async function apiRequest(endpoint: string, method: string = "GET", body?: any) {
  const options: RequestInit = {
    method,
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  };

  if (body) options.body = JSON.stringify(body);

  const url = `${BASE_URL}${endpoint}`;
  console.log("➡️ Fetching:", url);

  const res = await fetch(url, options);

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    console.error("❌ API Error:", error);
    throw new Error(error.message || `Request failed: ${res.status}`);
  }

  return res.json();
}
