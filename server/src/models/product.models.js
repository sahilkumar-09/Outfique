import mongoose, {Schema} from "mongoose"

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
      required: true,
    },
    price: {
      amount: {
        type: Number,
        required: true,
      },
      currency: {
        type: String,
        enum: ["USD", "EUR", "GBP", "JPY", "INR"],
        default: "INR",
      },
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
          amount: {
            type: Number,
            required: true,
          },
          currency: {
            type: String,
            enum: ["USD", "EUR", "GBP", "JPY", "INR"],
            default: "INR",
          },
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