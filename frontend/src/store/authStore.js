import { create } from "zustand";
import useApi from "../hooks/useApi";
const api = useApi();

const authStore = create((set) => ({
  user: null,
  loading: true,
  getUser: async () => {
    set({
      loading: true,
    });
    try {
      const res = await api.get("/auth/me");
      if (res.user) {
        set({ user: res.user });
      }
    } catch (err) {
      console.log(err);
    } finally {
      set({ loading: false });
    }
  },
  login: async (credential) => {
    set({
      loading: true,
    });
    try {
      const res = await api.post("/auth/login", credential);
      console.log(res);
      if (!res.success === false) {
        set({ user: res.user });
      }
    } catch (err) {
      console.log(err);
      throw err;
    } finally {
      set({ loading: false });
    }
  },
  logout: async () => {
    try {
      await api.post("/auth/logout");
      set({ user: null });
    } catch (err) {
      console.log(err);
    }
  },
}));

export default authStore;
