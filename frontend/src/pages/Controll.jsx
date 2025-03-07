import React, { useState, useRef, useEffect } from "react";
import {
  Package,
  Grid,
  Plus,
  Pencil,
  Trash,
  Search,
  Image as ImageIcon,
  X,
  Upload,
} from "lucide-react";
import adminStore from "../store/adminStore";

const Controll = () => {
  const { categories, loadingControl, getControl, products } = adminStore();
  const [activeTab, setActiveTab] = useState("categories"); // or "products"
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const addFileInputRef = useRef(null);
  const updateFileInputRef = useRef(null);
  useEffect(() => {
    getControl();
  }, []);
  useEffect(() => {
    console.log(products);
  }, [products]);

  // Add Form Data
  const [addFormData, setAddFormData] = useState({
    name: "",
    description: "",
    image: null,
    images: [],
    price: "",
    category: "",
    brand: "",
    stock: "",
    discount: "",
  });

  // Update Form Data
  const [updateFormData, setUpdateFormData] = useState({
    name: "",
    description: "",
    image: null,
    images: [],
    price: "",
    category: "",
    brand: "",
    stock: "",
    discount: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    if (activeTab === "categories") {
      // Single image for category
      setAddFormData((prev) => ({
        ...prev,
        image: files[0],
      }));
    } else {
      // Multiple images for product (max 5)
      if (files.length + addFormData.images.length > 5) {
        alert("You can only upload up to 5 images");
        return;
      }
      setAddFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...files].slice(0, 5),
      }));
    }
  };

  const removeImage = (index) => {
    setAddFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
    setShowUpdateForm(true);
    setShowAddForm(false);

    if (activeTab === "categories") {
      setUpdateFormData({
        name: item.name,
        description: item.description,
        image: item.image,
      });
    } else {
      setUpdateFormData({
        name: item.name,
        description: item.description,
        images: item.images || [],
        price: item.price,
        category: item.category,
        brand: item.brand,
        stock: item.stock,
        discount: item.discount || "",
      });
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    // Update API call here
    console.log("Updating:", selectedItem.id, updateFormData);
    setShowUpdateForm(false);
    setSelectedItem(null);
    setUpdateFormData({
      name: "",
      description: "",
      image: null,
      images: [],
      price: "",
      category: "",
      brand: "",
      stock: "",
      discount: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your API call here
    if (selectedItem) {
      // Update API call
      console.log("Updating:", selectedItem.id, updateFormData);
    } else {
      // Create API call
      console.log("Creating:", addFormData);
    }

    setShowAddForm(false);
    setShowUpdateForm(false);
    setSelectedItem(null);
    setAddFormData({
      name: "",
      description: "",
      image: null,
      images: [],
      price: "",
      category: "",
      brand: "",
      stock: "",
      discount: "",
    });
  };

  // Update the form header and button text based on edit mode
  const getFormTitle = () => {
    if (selectedItem) {
      return `Update ${activeTab === "categories" ? "Category" : "Product"}`;
    }
    return `Add New ${activeTab === "categories" ? "Category" : "Product"}`;
  };

  // Update the submit button text based on edit mode
  const getSubmitButtonText = () => {
    if (selectedItem) {
      return `Update ${activeTab === "categories" ? "Category" : "Product"}`;
    }
    return `Add ${activeTab === "categories" ? "Category" : "Product"}`;
  };

  // Update Form Component
  const UpdateForm = () => {
    if (!showUpdateForm) return null;

    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl w-full max-w-4xl p-6 max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-semibold text-level-5">
              Update {activeTab === "categories" ? "Category" : "Product"}
            </h3>
            <button
              onClick={() => {
                setShowUpdateForm(false);
                setSelectedItem(null);
              }}
              className="p-2 hover:bg-level-2/60 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-level-5" />
            </button>
          </div>

          {/* Form */}
          <form
            onSubmit={handleUpdate}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div className="space-y-6">
              {/* Name Input */}
              <div>
                <label className="block text-sm font-medium text-level-5 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={updateFormData.name}
                  onChange={(e) =>
                    setUpdateFormData((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                  className="w-full px-4 py-2 bg-transparent border-2 border-dashed border-level-4 rounded-xl text-level-5 placeholder-level-5/50 focus:outline-none focus:border-level-5 transition-colors"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-level-5 mb-2">
                  Description
                </label>
                <textarea
                  value={updateFormData.description}
                  onChange={(e) =>
                    setUpdateFormData((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  rows={3}
                  className="w-full px-4 py-2 bg-transparent border-2 border-dashed border-level-4 rounded-xl text-level-5 placeholder-level-5/50 focus:outline-none focus:border-level-5 transition-colors resize-none"
                />
              </div>

              {/* Product-specific fields */}
              {activeTab === "products" && (
                <>
                  {/* Price & Stock */}
                  <div className="grid grid-cols-2 gap-4">
                    {/* Price */}
                    <div>
                      <label className="block text-sm font-medium text-level-5 mb-2">
                        Price
                      </label>
                      <input
                        type="number"
                        value={updateFormData.price}
                        onChange={(e) =>
                          setUpdateFormData((prev) => ({
                            ...prev,
                            price: e.target.value,
                          }))
                        }
                        className="w-full px-4 py-2 bg-transparent border-2 border-dashed border-level-4 rounded-xl text-level-5"
                      />
                    </div>
                    {/* Stock */}
                    <div>
                      <label className="block text-sm font-medium text-level-5 mb-2">
                        Stock
                      </label>
                      <input
                        type="number"
                        value={updateFormData.stock}
                        onChange={(e) =>
                          setUpdateFormData((prev) => ({
                            ...prev,
                            stock: e.target.value,
                          }))
                        }
                        className="w-full px-4 py-2 bg-transparent border-2 border-dashed border-level-4 rounded-xl text-level-5"
                      />
                    </div>
                  </div>

                  {/* Category & Discount */}
                  <div className="grid grid-cols-2 gap-4">
                    {/* Category */}
                    <div>
                      <label className="block text-sm font-medium text-level-5 mb-2">
                        Category
                      </label>
                      <select
                        value={updateFormData.category}
                        onChange={(e) =>
                          setUpdateFormData((prev) => ({
                            ...prev,
                            category: e.target.value,
                          }))
                        }
                        className="w-full px-4 py-2 bg-transparent border-2 border-dashed border-level-4 rounded-xl text-level-5"
                      >
                        <option value="">Select category</option>
                        {categories.map((cat) => (
                          <option key={cat.id} value={cat.id}>
                            {cat.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    {/* Discount */}
                    <div>
                      <label className="block text-sm font-medium text-level-5 mb-2">
                        Discount (%)
                      </label>
                      <input
                        type="number"
                        value={updateFormData.discount}
                        onChange={(e) =>
                          setUpdateFormData((prev) => ({
                            ...prev,
                            discount: e.target.value,
                          }))
                        }
                        className="w-full px-4 py-2 bg-transparent border-2 border-dashed border-level-4 rounded-xl text-level-5"
                      />
                    </div>
                  </div>

                  {/* Brand */}
                  <div>
                    <label className="block text-sm font-medium text-level-5 mb-2">
                      Brand
                    </label>
                    <input
                      type="text"
                      value={updateFormData.brand}
                      onChange={(e) =>
                        setUpdateFormData((prev) => ({
                          ...prev,
                          brand: e.target.value,
                        }))
                      }
                      className="w-full px-4 py-2 bg-transparent border-2 border-dashed border-level-4 rounded-xl text-level-5"
                    />
                  </div>
                </>
              )}

              {/* Update Button */}
              <button
                type="submit"
                className="w-full py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
              >
                Update {activeTab === "categories" ? "Category" : "Product"}
              </button>
            </div>

            {/* Image Upload Section */}
            <div>
              <label className="block text-sm font-medium text-level-5 mb-2">
                {activeTab === "categories"
                  ? "Category Image"
                  : "Product Images (Max 5)"}
              </label>
              <div
                onClick={() => addFileInputRef.current?.click()}
                className="border-2 border-dashed border-level-4 rounded-xl p-8 cursor-pointer hover:border-level-5 transition-colors h-full flex items-center justify-center"
              >
                {activeTab === "categories" ? (
                  // Category single image upload
                  <div className="flex flex-col items-center gap-2">
                    {addFormData.image ? (
                      <div className="relative">
                        <img
                          src={URL.createObjectURL(addFormData.image)}
                          alt="Preview"
                          className="w-48 h-48 object-cover rounded-xl"
                        />
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setAddFormData((prev) => ({
                              ...prev,
                              image: null,
                            }));
                          }}
                          className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <>
                        <Upload className="w-12 h-12 text-level-5/50" />
                        <p className="text-level-5/70 text-sm text-center">
                          Click to upload or drag and drop
                          <br />
                          SVG, PNG, JPG or GIF (max. 2MB)
                        </p>
                      </>
                    )}
                  </div>
                ) : (
                  // Product multiple images upload
                  <div className="w-full">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                      {addFormData.images.map((image, index) => (
                        <div key={index} className="relative">
                          <img
                            src={URL.createObjectURL(image)}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-32 object-cover rounded-xl"
                          />
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeImage(index);
                            }}
                            className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                    {addFormData.images.length < 5 && (
                      <div className="flex flex-col items-center gap-2">
                        <Upload className="w-12 h-12 text-level-5/50" />
                        <p className="text-level-5/70 text-sm text-center">
                          Click to upload or drag and drop
                          <br />
                          SVG, PNG, JPG or GIF (max. 2MB)
                          <br />
                          {addFormData.images.length}/5 images
                        </p>
                      </div>
                    )}
                  </div>
                )}
                <input
                  type="file"
                  ref={addFileInputRef}
                  onChange={handleImageChange}
                  accept="image/*"
                  multiple={activeTab === "products"}
                  className="hidden"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  };
  //   return null;
  if (loadingControl) return <div>loading</div>;
  return (
    <div className="border-level-4 border-dashed border-b-2">
      <div className="container mx-auto min-h-[calc(100dvh-calc(var(--header-height)+var(--footer-height)+2px))] border-l-2 border-r-2 border-dashed border-level-4 py-8 px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-semibold text-level-5 relative before:content-[''] before:w-5 before:h-full before:bg-level-5 before:rounded-sm before:inline-block before:mr-2 before:absolute before:top-0 before:-left-7 ml-7">
            Control Zone
          </h2>
          <button
            onClick={() => {
              setShowAddForm(!showAddForm);
              setShowUpdateForm(false);
            }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-level-5 text-white rounded-xl hover:bg-level-5/90 transition-colors"
          >
            {showAddForm ? (
              <X className="w-5 h-5" />
            ) : (
              <Plus className="w-5 h-5" />
            )}
            {getFormTitle()}
          </button>
        </div>

        {/* Add Form */}
        {showAddForm && (
          <div className="mb-8 border-2 border-dashed border-level-4 rounded-xl p-6 bg-level-2/60">
            <h3 className="text-2xl font-semibold text-level-5 mb-6">
              {getFormTitle()}
            </h3>
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <div className="space-y-6">
                {/* Name Input */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-level-5 mb-2"
                  >
                    {activeTab === "categories" ? "Category" : "Product"} Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={addFormData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-transparent border-2 border-dashed border-level-4 rounded-xl text-level-5 placeholder-level-5/50 focus:outline-none focus:border-level-5 transition-colors"
                    placeholder={`Enter ${
                      activeTab === "categories" ? "category" : "product"
                    } name`}
                  />
                </div>

                {/* Description Input */}
                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-level-5 mb-2"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={addFormData.description}
                    onChange={handleChange}
                    required
                    rows={3}
                    className="w-full px-4 py-2 bg-transparent border-2 border-dashed border-level-4 rounded-xl text-level-5 placeholder-level-5/50 focus:outline-none focus:border-level-5 transition-colors resize-none"
                    placeholder={`Enter ${
                      activeTab === "categories" ? "category" : "product"
                    } description`}
                  />
                </div>

                {/* Product-specific fields */}
                {activeTab === "products" && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="price"
                          className="block text-sm font-medium text-level-5 mb-2"
                        >
                          Price
                        </label>
                        <input
                          type="number"
                          id="price"
                          name="price"
                          value={addFormData.price}
                          onChange={handleChange}
                          required
                          min="0"
                          className="w-full px-4 py-2 bg-transparent border-2 border-dashed border-level-4 rounded-xl text-level-5 placeholder-level-5/50 focus:outline-none focus:border-level-5 transition-colors"
                          placeholder="Enter price"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="stock"
                          className="block text-sm font-medium text-level-5 mb-2"
                        >
                          Stock
                        </label>
                        <input
                          type="number"
                          id="stock"
                          name="stock"
                          value={addFormData.stock}
                          onChange={handleChange}
                          required
                          min="0"
                          className="w-full px-4 py-2 bg-transparent border-2 border-dashed border-level-4 rounded-xl text-level-5 placeholder-level-5/50 focus:outline-none focus:border-level-5 transition-colors"
                          placeholder="Enter stock"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="category"
                          className="block text-sm font-medium text-level-5 mb-2"
                        >
                          Category
                        </label>
                        <select
                          id="category"
                          name="category"
                          value={addFormData.category}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2 bg-transparent border-2 border-dashed border-level-4 rounded-xl text-level-5 focus:outline-none focus:border-level-5 transition-colors"
                        >
                          <option value="">Select category</option>
                          {categories.map((cat) => (
                            <option key={cat._id} value={cat.id}>
                              {cat.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label
                          htmlFor="discount"
                          className="block text-sm font-medium text-level-5 mb-2"
                        >
                          Discount (%)
                        </label>
                        <input
                          type="number"
                          id="discount"
                          name="discount"
                          value={addFormData.discount}
                          onChange={handleChange}
                          min="0"
                          max="100"
                          className="w-full px-4 py-2 bg-transparent border-2 border-dashed border-level-4 rounded-xl text-level-5 placeholder-level-5/50 focus:outline-none focus:border-level-5 transition-colors"
                          placeholder="Enter discount"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="brand"
                        className="block text-sm font-medium text-level-5 mb-2"
                      >
                        Brand
                      </label>
                      <input
                        type="text"
                        id="brand"
                        name="brand"
                        value={addFormData.brand}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 bg-transparent border-2 border-dashed border-level-4 rounded-xl text-level-5 placeholder-level-5/50 focus:outline-none focus:border-level-5 transition-colors"
                        placeholder="Enter brand name"
                      />
                    </div>
                  </>
                )}

                <button
                  type="submit"
                  className="w-full py-3 bg-level-5 text-white rounded-xl hover:bg-level-5/90 transition-colors"
                >
                  {getSubmitButtonText()}
                </button>
              </div>

              {/* Image Upload Section */}
              <div>
                <label className="block text-sm font-medium text-level-5 mb-2">
                  {activeTab === "categories"
                    ? "Category Image"
                    : "Product Images (Max 5)"}
                </label>
                <div
                  onClick={() => addFileInputRef.current?.click()}
                  className="border-2 border-dashed border-level-4 rounded-xl p-8 cursor-pointer hover:border-level-5 transition-colors h-full flex items-center justify-center"
                >
                  {activeTab === "categories" ? (
                    // Category single image upload
                    <div className="flex flex-col items-center gap-2">
                      {addFormData.image ? (
                        <div className="relative">
                          <img
                            src={URL.createObjectURL(addFormData.image)}
                            alt="Preview"
                            className="w-48 h-48 object-cover rounded-xl"
                          />
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setAddFormData((prev) => ({
                                ...prev,
                                image: null,
                              }));
                            }}
                            className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <>
                          <Upload className="w-12 h-12 text-level-5/50" />
                          <p className="text-level-5/70 text-sm text-center">
                            Click to upload or drag and drop
                            <br />
                            SVG, PNG, JPG or GIF (max. 2MB)
                          </p>
                        </>
                      )}
                    </div>
                  ) : (
                    // Product multiple images upload
                    <div className="w-full">
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                        {addFormData.images.map((image, index) => (
                          <div key={index} className="relative">
                            <img
                              src={URL.createObjectURL(image)}
                              alt={`Preview ${index + 1}`}
                              className="w-full h-32 object-cover rounded-xl"
                            />
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                removeImage(index);
                              }}
                              className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                      {addFormData.images.length < 5 && (
                        <div className="flex flex-col items-center gap-2">
                          <Upload className="w-12 h-12 text-level-5/50" />
                          <p className="text-level-5/70 text-sm text-center">
                            Click to upload or drag and drop
                            <br />
                            SVG, PNG, JPG or GIF (max. 2MB)
                            <br />
                            {addFormData.images.length}/5 images
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                  <input
                    type="file"
                    ref={addFileInputRef}
                    onChange={handleImageChange}
                    accept="image/*"
                    multiple={activeTab === "products"}
                    className="hidden"
                  />
                </div>
              </div>
            </form>
          </div>
        )}

        {/* Update Form Modal */}
        <UpdateForm />

        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab("categories")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl border-2 border-dashed transition-colors ${
              activeTab === "categories"
                ? "border-level-5 text-level-5 bg-level-2/60"
                : "border-level-4 text-level-5/70 hover:border-level-5 hover:text-level-5"
            }`}
          >
            <Grid className="w-5 h-5" />
            Categories
          </button>
          <button
            onClick={() => setActiveTab("products")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl border-2 border-dashed transition-colors ${
              activeTab === "products"
                ? "border-level-5 text-level-5 bg-level-2/60"
                : "border-level-4 text-level-5/70 hover:border-level-5 hover:text-level-5"
            }`}
          >
            <Package className="w-5 h-5" />
            Products
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <input
            type="text"
            placeholder={`Search ${activeTab}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 pl-10 bg-transparent border-2 border-dashed border-level-4 rounded-xl text-level-5 placeholder-level-5/50 focus:outline-none focus:border-level-5 transition-colors"
          />
          <Search className="w-5 h-5 text-level-5/50 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>

        {/* Content */}
        <div className="space-y-4">
          {activeTab === "categories" ? (
            // Categories Grid
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories.map((category) => (
                <div
                  key={category._id}
                  className="border-2 border-dashed border-level-4 rounded-xl p-4 bg-level-2/60"
                >
                  <div className="flex gap-4">
                    <div className="w-20 h-20 bg-level-3 rounded-xl flex items-center justify-center">
                      <ImageIcon className="w-8 h-8 text-level-5/50" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-level-5">
                        {category.name}
                      </h3>
                      <p className="text-level-5/70 text-sm">
                        {category.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 mt-4">
                    <button
                      onClick={() => handleEdit(category)}
                      className="p-2 text-blue-500 hover:bg-blue-500/10 rounded-lg transition-colors"
                    >
                      <Pencil className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors">
                      <Trash className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // Products Table
            <div className="border-2 border-dashed border-level-4 rounded-xl overflow-hidden">
              <table className="w-full">
                <thead className="bg-level-2/60 border-b-2 border-dashed border-level-4">
                  <tr>
                    <th className="text-left p-4 text-level-5">Product</th>
                    <th className="text-left p-4 text-level-5">Category</th>
                    <th className="text-left p-4 text-level-5">Price</th>
                    <th className="text-left p-4 text-level-5">Stock</th>
                    <th className="text-right p-4 text-level-5">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr
                      key={product._id}
                      className="border-b border-dashed border-level-4 last:border-none hover:bg-level-2/60"
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-level-3 rounded-lg flex items-center justify-center">
                            <ImageIcon className="w-6 h-6 text-level-5/50" />
                          </div>
                          <div>
                            <h4 className="font-medium text-level-5">
                              {product.name}
                            </h4>
                            <p className="text-sm text-level-5/70">
                              {product.description}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-level-5">
                        {product.category.name}
                      </td>
                      <td className="p-4 text-level-5">৳{product.price}</td>
                      <td className="p-4 text-level-5">{product.stock}</td>
                      <td className="p-4">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleEdit(product)}
                            className="p-2 text-blue-500 hover:bg-blue-500/10 rounded-lg transition-colors"
                          >
                            <Pencil className="w-5 h-5" />
                          </button>
                          <button className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors">
                            <Trash className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Controll;
