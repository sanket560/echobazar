import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true,
    },
    colors: {
      type: [String],
      required:true,
    },
    storageOptions: {
      type: [String],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    originalPrice: {
      type: Number,
      required: true,
    },
    discountPrice: {
      type: Number,
      required: true,
    },
    latestProduct: {
      type: String,
      required: true,
    },
    sellerName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Product = mongoose.models.Product || mongoose.model("Product",ProductSchema);
export default Product;
