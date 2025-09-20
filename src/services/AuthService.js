import api from "../api/axios";

const AuthService = {
  login: async (email, password) => {
    const res = await api.post("/login", { email, password });
    return res.data;
  },

  register: async (email, password, username) => {
    const res = await api.post("/register", { email, password, username });
    return res.data;
  },

  logout: () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
  },
};

export default AuthService;
