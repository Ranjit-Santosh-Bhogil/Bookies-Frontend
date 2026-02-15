const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8080";

export const getToken = () => localStorage.getItem("token");
export const setToken = (token) => {
  if (token) localStorage.setItem("token", token);
  else localStorage.removeItem("token");
};
export const getUser = () => {
  const u = localStorage.getItem("user");
  return u ? JSON.parse(u) : null;
};
export const setUser = (user) => {
  if (user) localStorage.setItem("user", JSON.stringify(user));
  else localStorage.removeItem("user");
};

export function apiUrl(path) {
  return path.startsWith("http") ? path : `${API_BASE}${path.startsWith("/") ? path : "/" + path}`;
}

export async function request(method, path, body = null, options = {}) {
  const url = apiUrl(path);
  const token = getToken();
  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };
  const config = { method, headers, ...options };
  if (body != null) {
    if (body instanceof FormData) {
      delete headers["Content-Type"];
      config.body = body;
    } else if (typeof body === "object") {
      config.body = JSON.stringify(body);
    } else {
      config.body = body;
    }
  }
  const res = await fetch(url, config);
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || res.statusText || "Request failed");
  return data;
}

export const api = {
  get: (path, opts) => request("GET", path, null, opts),
  post: (path, body, opts) => request("POST", path, body, opts),
  put: (path, body, opts) => request("PUT", path, body, opts),
  delete: (path, opts) => request("DELETE", path, null, opts),
};

export default api;
