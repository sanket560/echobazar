import mongoose, { mongo } from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["phone", "mens", "womens", "smart_tv"],
      required: true,
    },
    brand: {
      type: String,
      required: function () {
        return this.type === "phone" || this.type === "smart_tv";
      },
    },
    image: {
      type: String,
      required: true,
    },
    colors: {
      type: [String],
      required: function () {
        return this.type === "phone";
      },
    },
    sizes: {
      type: [String],
      required: function () {
        return this.type === "mens" || this.type === "womens";
      },
    },
    displaySizes: {
      type: [String],
      required: function () {
        return this.type === "smart_tv";
      },
    },
    operatingSystem: {
      type: String,
      required: function () {
        return this.type === "smart_tv";
      },
    },
    storageOptions: {
      type: [String],
      required: function () {
        return this.type === "phone";
      },
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
    onSale: {
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
