import products from "../models/product.models.js"
import { uploadImage } from "../services/storage.service.js"

const createProductController = async (req, res) => {
    try {
        const { title, description, amount, currency } = req.body
        const seller = req.user
        const images = await Promise.all(req.files.map(async (file) => {
            return await uploadImage({
                buffer: file.buffer,
                fileName: file.originalname,
                folder: "Outfique/products"
            })
        }))

        const product = await products.create({
            title, 
            description,
            price: {
                amount,
                currency
            },
            productImages: images,
            seller: seller._id
        })

        return res.status(201).json({
            success: true,
            message: "Product created successfully",
            data: product
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

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
    const product = await products.find()
    return res.status(200).json({
      message: "Products fetched successfully",
      success: true,
      products: product
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    })
  }
}

export {
  createProductController,
  getAllProductsController,
  getAllSellerProductsController,
};