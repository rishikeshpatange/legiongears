const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    desc: { type: String, required: true },
    img: { type: String, required: true },
    category: { type: String, required: true, index: true }, // Added index for faster queries
    size: { type: [String] }, // Changed to an array to reflect actual usage
    color: { type: [String] }, // Changed to an array to reflect actual usage
    price: { type: Number, required: true },
    availabelQty: { type: Number, required: true },
  },
  { timestamps: true }
);

// Avoid re-compiling the model during hot reloads
const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);

export default Product;
