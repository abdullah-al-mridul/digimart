import { create } from "zustand";
import useApi from "../hooks/useApi";
const api = useApi();
const cartStore = create((set) => ({
  cart: [],
  loading: true,
  getCart: async () => {
    set({
      loading: true,
    });
    try {
      const cart = await api.get("/cart");
      set({
        cart: cart.cart,
      });
    } catch (error) {
      console.log(error);
    } finally {
      set({
        loading: false,
      });
    }
  },
}));
export default cartStore;
