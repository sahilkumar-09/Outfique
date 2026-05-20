import mongoose from "mongoose"
import addressSchema from "./address.schema.js"

const profileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    address: [
        addressSchema
    ],
    wishList: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product"
    }
}, {timestamp: true})

const profileModel = mongoose.model("profile", profileSchema)
export default profileModel