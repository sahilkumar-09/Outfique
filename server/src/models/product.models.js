import mongoose, {Schema} from "mongoose"
import priceSchema from "./price.schema.js"

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true
    },
    price: {
      type: priceSchema,
      required: true
    },
    productImages: [
      {
        url: {
          type: String,
          required: true,
        },
      },
    ],
    variants: [
      { 
        productImages: [
          {
            url: {
              type: String,
              required: true,
            },
          },
        ],
        stock: {
          type: Number,
          default: 0,
        },
        attributes: {
          type: Map,
          of: String,
        },
        price: {
          type: priceSchema,
          require: true
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);

const products = mongoose.model("product", productSchema)
export default products