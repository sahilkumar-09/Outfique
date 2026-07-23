import categories from "../models/category.model.js";
import products from "../models/product.models.js";
import { uploadImage } from "../services/storage.service.js";

const createCategoryController = async (req, res) => {
  const { name } = req.body;
  const exists = await categories.findOne({ name });

  if (exists) {
    return res.status(400).json({
      success: false,
      message: "Category already exists",
    });
  }

  const image = await uploadImage({
    buffer: req.file.buffer,
    fileName: req.file.originalname,
    folder: "Outfique/categories",
  });

  const category = await categories.create({ name, image });
  return res.status(201).json({
    success: true,
    message: "Category created successfully",
    category,
  });
};

const getAllCategoryController = async (req, res) => {
  try {
    const category = await categories.find().sort({ name: 1 });
    return res.status(200).json({
      success: true,
      category,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllProductByCategorySlugController = async (req, res) => {
  try {
    const { slug } = req.params;

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const {
      minPrice,
      maxPrice,
      sort,
      size,
      color,
      pattern,
      fit,
      material,
      collar,
      sleeves,
    } = req.query;

    const category = await categories.findOne({ slug });

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    const filter = {
      category: category._id,
    };

    if (minPrice || maxPrice) {
      filter["price.amount"] = {};
      if (minPrice) filter["price.amount"].$gte = Number(minPrice);
      if (maxPrice) filter["price.amount"].$lte = Number(maxPrice);
    }

    const toList = (val) =>
      val
        ? val
            .split(",")
            .map((v) => v.trim())
            .filter(Boolean)
        : [];

    // Size — variants.attributes.size is an array field, $in matches if
    // ANY value in that array overlaps the requested sizes
    const sizeList = toList(size);

    // Color — case-insensitive match against variants.attributes.color
    const colorList = toList(color);
    if (sizeList.length || colorList.length) {
      filter.variants = {
        $elemMatch: {
          ...(sizeList.length && { "attributes.size": { $in: sizeList } }),
          ...(colorList.length && {
            "attributes.color": {
              $in: colorList.map((c) => new RegExp(`^${c}$`, "i")),
            },
          }),
        },
      };
    }

    // Not yet on the schema — wired for when you add them under
    // variants.attributes.<field>. Currently a no-op match if the field
    // doesn't exist on any document (Mongo just won't find matches).
    const attributeFilterMap = { pattern, fit, material, collar, sleeves };
    for (const [key, value] of Object.entries(attributeFilterMap)) {
      const list = toList(value);
      if (list.length) {
        filter[`variants.attributes.${key}`] = {
          $in: list.map((v) => new RegExp(`^${v}$`, "i")),
        };
      }
    }

    // Sorting
    const sortOption = {};
    switch (sort) {
      case "price-asc":
        sortOption["price.amount"] = 1;
        break;
      case "price-desc":
        sortOption["price.amount"] = -1;
        break;
      case "newest":
        sortOption.createdAt = -1;
        break;
      case "oldest":
        sortOption.createdAt = 1;
        break;
      default:
        sortOption.createdAt = -1;
    }

    const totalProducts = await products.countDocuments(filter);

    const categoryProduct = await products
      .find(filter)
      .populate("category")
      .sort(sortOption)
      .skip(skip)
      .limit(limit);

    return res.status(200).json({
      success: true,
      totalProducts,
      currentPage: page,
      totalPages: Math.ceil(totalProducts / limit),
      products: categoryProduct,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export {
  createCategoryController,
  getAllCategoryController,
  getAllProductByCategorySlugController,
};
