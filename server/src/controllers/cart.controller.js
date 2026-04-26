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
      price: product.variants.find(
        (variant) => variant._id.toString() === variantId,
      ).price,
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
  let cart = await carts
    .findOne({ user: req.user._id })
    .populate("items.productId");
  if (!cart) {
    cart = await carts.create({ user: req.user._id });
  }
  return res.status(200).json({
    success: true,
    message: "Cart fetched successfully",
    cart,
  });
};

const incrementQuantityController = async (req, res) => {
  try {
    const { productId, variantId } = req.params;

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

    const cart = await carts.findOne({
      user: req.user._id,
      "items.productId": productId,
      "items.variantId": variantId,
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Product not found in cart",
      });
    }

    const stock = await stockVariant(productId, variantId);

    const itemQuantityInCart = cart.items.find(
      (item) =>
        item.productId.toString() === productId &&
        item.variantId.toString() === variantId,
    ).quantity;

    if (itemQuantityInCart + 1 > stock) {
      return res.status(400).json({
        success: false,
        message: `Only ${stock} items left in stock and you already have ${itemQuantityInCart} in cart`,
      });
    }

    await carts.findOneAndUpdate(
      {
        user: req.user._id,
        "items.productId": productId,
        "items.variantId": variantId,
      },
      {
        $inc: {
          "items.$.quantity": 1,
        },
      },
      {
        new: true,
      },
    );

    return res.status(200).json({
      success: true,
      message: "Quantity incremented successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const decrementQuantityController = async (req, res) => {
  try {
    const { productId, variantId } = req.params;
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

    const cart = await carts.findOne({
      user: req.user._id,
      "items.productId": productId,
      "items.variantId": variantId,
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Product not found in cart",
      });
    }

    const itemQuantityInCart = cart.items.find(
      (item) =>
        item.productId?.toString() === productId &&
        item.variantId?.toString() === variantId,
    ).quantity;

    if (!itemQuantityInCart) {
      return res.status(400).json({
        success: false,
        message: "Item not found in cart",
      });
    }

    if (itemQuantityInCart <= 1) {
      return res.status(400).json({
        success: false,
        message: "Minimum quantity is 1",
      });
    }

    await carts.findOneAndUpdate(
      {
        user: req.user._id,
        "items.productId": productId,
        "items.variantId": variantId,
      },
      {
        $inc: {
          "items.$.quantity": -1,
        },
      },
      {
        new: true,
      },
    );

    return res.status(200).json({
      success: true,
      message: "Quantity decremented successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const deleteQuantityController = async (req, res) => {
  const { productId, variantId } = req.params;

  const cart = await carts.findOne({
    user: req.user._id,
    "items.productId": productId,
    "items.variantId": variantId,
  });

  if (!cart) {
    return res.status(404).json({
      success: false,
      message: "Product not found in cart",
    });
  }

  await carts.findOneAndUpdate(
    { user: req.user._id },
    {
      $pull: {
        items: {
          productId,
          variantId,
        },
      },
    },
  );

  return res.status(200).json({
    success: true,
    message: "Item removed from cart successfully",
  });
};

export {
  addToCartController,
  getAllCartController,
  incrementQuantityController,
  decrementQuantityController,
  deleteQuantityController,
};
