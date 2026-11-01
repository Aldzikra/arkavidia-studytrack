import axios from "axios";

const TOKEN_KEY = "et_token";
const USER_KEY = "et_user";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);

      // Login/register yang gagal juga 401: biarkan halamannya menampilkan pesan.
      const { pathname } = window.location;
      if (pathname !== "/login" && pathname !== "/register") {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  },
);

// Backend membalas error sebagai { "error": "..." }.
// Platform (mis. Vercel) bisa membalas { "error": { "code", "message" } },
// jadi pastikan yang dikembalikan selalu string agar aman dirender React.
export function getApiError(err: unknown): string {
  if (axios.isAxiosError<{ error?: unknown }>(err)) {
    const e = err.response?.data?.error;
    if (typeof e === "string") return e;
    if (e && typeof e === "object" && "message" in e && typeof e.message === "string") {
      return e.message;
    }
    return "Tidak dapat terhubung ke server";
  }

  return "Terjadi kesalahan, coba lagi";
}

export default api;
export { TOKEN_KEY, USER_KEY };
