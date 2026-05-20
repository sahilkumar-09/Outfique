import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  fullName: String,

  contact: String,

  houseNo: String,

  street: String,

  landmark: String,

  city: String,

  state: String,

  country: {
    type: String,
    default: "India",
  },

  pincode: String,

  addressType: {
    type: String,
    enum: ["home", "work", "other"],
    default: "home",
  },

  isDefault: {
    type: Boolean,
    default: false,
  },
});

export default addressSchema
