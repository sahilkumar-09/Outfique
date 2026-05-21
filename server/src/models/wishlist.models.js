import mongoose from "mongoose"
import priceSchema from "./price.schema.js"

const wishListSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    items: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "product",
                required: true
            },
            variantId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: `product.variants`,
                required: true
            },
            price: {
                type: priceSchema
            }
        }
    ]
}, {timestamps: true})

const wishLists = mongoose.model("wishList", wishListSchema)
export default wishLists