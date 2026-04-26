import { stockVariant } from "../dao/product.dao.js";
import products from "../models/product.models.js";
import carts from "../models/cart.models.js";

const addToCartController = async (req, res) => {
  try {
    const { productId, variantId } = req.params;
    const { quantity } = req.body;

    const product = await products.findOne({
      _id: productId,
      "variants._id": variantId,
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const stock = await stockVariant(productId, variantId);

    let cart = await carts.findOne({
      user: req.user._id,
    });

    if (!cart) {
      cart = await carts.create({
        user: req.user._id,
        items: [],
      });
    }

    const isProductAlreadyInCart = cart.items.find(
      (item) =>
        item.product?.toString() === productId &&
        item.variant?.toString() === variantId,
    );

    if (isProductAlreadyInCart) {
      const quantityInCart = cart.items.find(
        (item) =>
          item.product.toString() === productId &&
          item.variant.toString() === variantId,
      );

      if (quantityInCart + quantity > stock) {
        return res.status(400).json({
          success: false,
          message: `Only ${stock} items left in stock and you already have ${quantityInCart} in cart`,
        });
      }

      await carts.findOneAndUpdate(
        {
          user: req.user._id,
          "items.product": productId,
          "items.variant": variantId,
        },
        {
          $inc: { "items.$.quantity": quantity },
        },
        {
          new: true,
        },
      );

      return res.status(200).json({
        success: true,
        message: "Product updated in cart",
        cart,
      });
    }

    if (quantity > stock) {
      return res.status(400).json({
        success: false,
        message: `Only ${stock} items left in stock`,
      });
    }

    cart.items.push({
      productId,
      variantId,
      quantity,
      price: product.variants.find((variant) => variant._id.toString() === variantId).price
    });

    await cart.save();

    return res.status(200).json({
      success: true,
      message: "Product added to cart",
      cart,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const getAllCartController = async (req, res) => {

  let cart = await carts.findOne({ user: req.user._id })
    if (!cart) {
      cart = await carts.create({ user: req.user._id });
    }
    return res.status(200).json({
      success: true,
      message: "Cart fetched successfully",
      cart,
    });
};

export { addToCartController, getAllCartController };
