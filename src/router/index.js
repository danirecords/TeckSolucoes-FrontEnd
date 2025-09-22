import { defineStore } from "pinia";
import api from "../api/axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    token: localStorage.getItem("token") || null,
  }),
  actions: {
    async login(email, password) {
      const { data } = await api.post("/login", { email, password });
      this.token = data.access_token;
      localStorage.setItem("token", data.access_token);
      await this.me();
    },
    async me() {
      const { data } = await api.get("/me");
      this.user = data;
    },
    logout() {
      this.token = null;
      this.user = null;
      localStorage.removeItem("token");
    },
  },
});
