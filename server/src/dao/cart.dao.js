import carts from "../models/cart.models.js";
import mongoose from "mongoose";

export const getCartByUserId = async(userId) => {
    let cart = (
      await carts.aggregate([
        {
          $match: {
            user: new mongoose.Types.ObjectId(userId),
          },
        },
        { $unwind: { path: "$items" } },
        {
          $lookup: {
            from: "products",
            localField: "items.productId",
            foreignField: "_id",
            as: "items.productId",
          },
        },
        { $unwind: { path: "$items.productId" } },
        {
          $unwind: {
            path: "$items.productId.variants",
          },
        },
        {
          $match: {
            $expr: {
              $eq: ["$items.variantId", "$items.productId.variants._id"],
            },
          },
        },
        {
          $addFields: {
            itemsPrice: {
              amount: {
                $multiply: [
                  "$items.quantity",
                  "$items.productId.variants.price.amount",
                ],
              },
              currency: "$items.productId.variants.price.currency",
            },
          },
        },
        {
          $group: {
            _id: "$_id",
            totalPrice: {
              $sum: "$itemsPrice.amount",
            },
            currency: {
              $first: "$itemsPrice.currency",
            },
            items: { $push: "$items" },
          },
        },
      ])
    )[0];

  return cart
}