import products from "../models/product.models.js";
import { uploadImage } from "../services/storage.service.js";

const createProductController = async (req, res) => {
  try {
    const { title, description, amount, currency } = req.body;
    const seller = req.user;
    const images = await Promise.all(
      req.files.map(async (file) => {
        return await uploadImage({
          buffer: file.buffer,
          fileName: file.originalname,
          folder: "Outfique/products",
        });
      }),
    );

    const product = await products.create({
      title,
      description,
      price: {
        amount,
        currency,
      },
      productImages: images,
      seller: seller._id,
    });

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @get all products of authentication seller
 */

const getAllSellerProductsController = async (req, res) => {
  try {
    const seller = req.user;
    const getAllProduct = await products.find({ seller: seller._id });

    if (!getAllProduct) {
      return res.state(404).json({
        success: false,
        message: "No products are available",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      products: getAllProduct,
    });
  } catch (error) {
    return res.statue(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @get all products controller
 */

const getAllProductsController = async (req, res) => {
  try {
    const product = await products.find();
    return res.status(200).json({
      message: "Products fetched successfully",
      success: true,
      products: product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

/**
 * @get product by id controller
 */

const getProductByIdController = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await products.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product fetched successfully",
      product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

/**
 * @add product variant controller
 */

const addProductVariantController = async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await products.findOne({
      _id: productId,
      seller: req.user._id,
    });

    const files = req.files;
    const images = [];
    console.log(files);

    if (files || files.length !== 0) {
      (
        await Promise.all(
          files.map(async (file) => {
            const image = await uploadImage({
              buffer: file.buffer,
              fileName: file.originalname,
            });

            return image;
          }),
        )
      ).map((image) => images.push(image));
    }

    const stock = req.body.stock;
    const attributes = JSON.parse(req.body.attributes || "{}");
    const price = req.body.amount;

    product.variants.push({
      productImages: images,
      stock,
      attributes,
      price: {
        amount: price,
        currency: req.body.currency || product.price.currency,
      },
    });

    await product.save();
    // console.log(product, images, stock, attributes, price)

    return res.status(201).json({
      success: true,
      message: "Variant created successfully",
      product: {
        stock,
        attributes,
        price,
        productImages: images,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const getSearchController = async (req, res) => {
  const search = req.query.search || "";
  const product = await products.find({
    title: {
      $regex: search,
      $options: "i",
    },
  });

  res.status(200).json({
    success: true,
    product,
  });
};

export {
  createProductController,
  getAllProductsController,
  getAllSellerProductsController,
  getProductByIdController,
  addProductVariantController,
  getSearchController,
};
