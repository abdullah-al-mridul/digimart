import Category from "../models/category.model.js";
import {
  uploadToCloudinary,
  deleteFromCloudinary,
} from "../utilities/cloudinary.js";

// @desc    Create new category
export const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    // Check if category exists
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({
        success: false,
        message: "Category already exists",
      });
    }

    // Handle image upload
    let image = "default-category.png";
    if (req.file) {
      const result = await uploadToCloudinary(req.file, "categories");
      image = result.url;
    }

    const category = await Category.create({
      name,
      description,
      image,
    });

    res.status(201).json({
      success: true,
      message: "Category created successfully",
      category,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating category",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// @desc    Get all categories
export const getCategories = async (req, res) => {
  try {
    const { sort = "name", isActive } = req.query;

    // Build query
    const query = {};
    if (isActive !== undefined) {
      query.isActive = isActive === "true";
    }

    const categories = await Category.find(query).sort(sort);

    res.json({
      success: true,
      count: categories.length,
      categories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching categories",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// @desc    Get category by ID
export const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    res.json({
      success: true,
      category,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching category",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// @desc    Update category
export const updateCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    // Handle image upload
    if (req.file) {
      // Delete old image if it's not the default
      if (category.image !== "default-category.png") {
        const publicId = category.image.split("/").pop().split(".")[0];
        await deleteFromCloudinary(publicId);
      }

      // Upload new image
      const result = await uploadToCloudinary(req.file, "categories");
      req.body.image = result.url;
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.json({
      success: true,
      message: "Category updated successfully",
      category: updatedCategory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating category",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// @desc    Delete category
export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    // Delete category image if it's not the default
    if (category.image !== "default-category.png") {
      const publicId = category.image.split("/").pop().split(".")[0];
      await deleteFromCloudinary(publicId);
    }

    await category.remove();

    res.json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting category",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
