//   _id: ObjectId,
//   name: String,
//   description: String,
//   category: String, // "T-Shirt" | "Mug" | "Hoodie" | "Phone Case"
//   price: Number,
//   stockQuantity: Number,
//   imageUrl: String,
//   status: String, // "active" | "inactive"
//   createdAt: Date,
//   updatedAt: Date
export class Product {
  constructor(product) {
    this._id = product._id;
    this.name = product.name || "";
    this.description = product.description || "";
    this.price = product.price || 0;
    this.quantity = product.quantity || 0;
    this.imageUrl = product.imageUrl || "";
    this.category = product.category || "";
    this.status = product.status || "active"; // active | inactive
    this.created_at = product.created_at || new Date();
    this.updated_at = product.updated_at || new Date();
  }
}