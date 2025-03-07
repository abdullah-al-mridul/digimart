import { create } from "zustand";
import useApi from "../hooks/useApi";
import toast from "react-hot-toast";
const api = useApi();

const adminStore = create((set, get) => ({
  loading: true,
  dashboard: null,
  orders: [],
  categories: [],
  loadingControl: true,
  products: [],
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
  getControl: async () => {
    set({
      loadingControl: true,
    });
    try {
      const res = await api.get("/categories");
      const products = await api.get("/products");

      set({
        categories: res.categories,
      });
      set({
        products: products.products,
      });
    } catch (err) {
      console.log(err);
    } finally {
      set({
        loadingControl: false,
      });
    }
  },
  addCatagory: async (newCategoryData) => {
    try {
      const form = new FormData();
      form.append("name", newCategoryData.name);
      form.append("description", newCategoryData.description);
      form.append("image", newCategoryData.image);

      const res = await toast.promise(
        api.post("/categories", form), // API Call
        {
          loading: "Adding category...", // Loading text
          success: "Category added successfully!", // Success text
          error: "Failed to add category.", // Error text
        }
      );

      set({
        categories: [...get().categories, res.category],
      });

      console.log(res);
    } catch (error) {
      // Handle error explicitly here
      console.error("Error adding category:", error);
      toast.error("Something went wrong. Please try again.");
    }
  },
  deleteCatagory: async (catId) => {
    try {
      const res = await toast.promise(api.delete(`/categories/${catId}`), {
        loading: "Deleting category...",
        success: "Category deleted successfully!",
        error: "Failed to delete category.",
      });
      set({
        categories: get().categories.filter(
          (category) => category._id !== catId
        ),
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  },
  updateCatagory: async (updateCategoryData, catId) => {
    try {
      const form = new FormData();
      form.append("name", updateCategoryData.name);
      form.append("description", updateCategoryData.description);
      if (updateCategoryData.image instanceof File) {
        form.append("image", updateCategoryData.image);
      }

      const res = await toast.promise(api.put(`/categories/${catId}`, form), {
        loading: "Updating category...",
        success: "Category update successfully!",
        error: "Failed to update category.",
      });

      set({
        categories: get().categories.map((cat) =>
          cat._id === catId ? res.category : cat
        ),
      });

      console.log(res);
    } catch (error) {
      // Handle error explicitly here
      console.error("Error adding category:", error);
      toast.error("Something went wrong. Please try again.");
    }
  },
  addProduct: async (newProductData) => {
    try {
      const form = new FormData();
      form.append("name", newProductData.name);
      form.append("description", newProductData.description);
      form.append("images", newProductData.images);
      form.append("price", newProductData.price);
      form.append("stock", newProductData.stock);
      form.append("brand", newProductData.brand);
      form.append("category", newProductData.category);
      form.append("discount", newProductData.discount);

      const res = await toast.promise(
        api.post("/products", form), // API Call
        {
          loading: "Adding product...", // Loading text
          success: "Product added successfully!", // Success text
          error: "Failed to add product.", // Error text
        }
      );

      set({
        products: [...get().products, res.product],
      });

      console.log(res);
    } catch (error) {
      // Handle error explicitly here
      console.error("Error adding product:", error);
      toast.error("Something went wrong. Please try again.");
    }
    console.log(newProductData);
  },
}));

export default adminStore;
