import { create } from "zustand";
import useApi from "../hooks/useApi";
import toast from "react-hot-toast";
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
  addToCart: async (productId, quantity) => {
    try {
      const res = await toast.promise(
        api.post("/cart", { productId, quantity }),
        {
          loading: "Adding product...",
          success: "Product added successfully!",
          error: "Failed to add product.",
        }
      );
      set({
        cart: [...get().cart, res.product],
      });
    } catch (error) {
      console.log(error);
    }
  },
}));
export default cartStore;
