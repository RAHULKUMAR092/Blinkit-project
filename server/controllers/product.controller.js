import ProductModel from "../models/product.model.js";

export const createProductController = async (request, response) => {
  try {
    const {
      name,
      image,
      category,
      subCategory,
      unit,
      stock,
      price,
      discount,
      description,
      more_details,
    } = request.body;
    if (
      !name ||
      !image[0] ||
      !category[0] ||
      !subCategory[0] ||
      !unit ||
      !price ||
      !description ||
      !more_details
    ) {
      return response.status(400).json({
        message: "Please fill all the fields",
        error: true,
        success: false,
      });
    }
    const product = new ProductModel({
      name,
      image,
      category,
      subCategory,
      unit,
      stock,
      price,
      discount,
      description,
      more_details,
    });
    const saveProduct = await product.save();
    return response.status(201).json({
      message: "Product created successfully",
      data: saveProduct,
      error: false,
      success: true,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const getProductController = async (request, response) => {
  try {
    let { page, limit, search } = request.body;

    if (!page) {
      page = 2; // default page number
    }
    if (!limit) {
      limit = 10; // default limit
    }
    const query = search
      ? {
          $text: {
            $search: search,
          },
        }
      : {};
    const skip = (page - 1) * limit;
    const [data, totalCount] = await Promise.all([
      ProductModel.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
      ProductModel.countDocuments(query),
    ]);
    return response.status(200).json({
      message: "Product retrieved successfully",
      error: false,
      success: true,
      totalCount: totalCount,
      totalNoPage: Math.ceil(totalCount / limit),
      data: data,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const getProductByCategory = async (request, response) => {
  try {
    const { id } = request.body;

    if (!id) {
      return response.status(400).json({
        message: "Category id is required",
        error: true,
        success: false,
      });
    }

    const product = await ProductModel.find({
      category: { $in: id },
    }).limit(15);
    return response.status(200).json({
      message: "Category product retrieved successfully",
      data: product,
      error: false,
      success: true,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
