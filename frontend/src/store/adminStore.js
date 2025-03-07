import { create } from "zustand";
import useApi from "../hooks/useApi";
const api = useApi();
const adminStore = create((set) => ({
  loading: true,
  dashboard: null,
  orders: [],
  categories: [],
  loadingControl: true,
  getDashboard: async () => {
    set({
      loading: true,
    });
    try {
      const res = await api.get("/admin/dashboard");
      const orders = await api.get("/admin/orders");
      set({
        dashboard: res.data,
        orders: [...orders.data],
      });
    } catch (err) {
      console.log(err);
    } finally {
      set({
        loading: false,
      });
    }
  },
  getCategories: async () => {
    set({
      loadingControl: true,
    });
    try {
      const res = await api.get("/categories");
      set({
        categories: res.categories,
      });
    } catch (err) {
      console.log(err);
    } finally {
      set({
        loadingControl: false,
      });
    }
  },
}));

export default adminStore;
