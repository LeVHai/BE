
export class Product {
  constructor(product) {
    this._id = product._id;
    this.name = product.name || "";
    this.description = product.description || "";
    this.price = product.price || 0;
    this.quantity = product.quantity || 0;
    this.image = product.image || "";
    this.category = product.category || "";
    this.status = product.status || "active"; // active | inactive
    this.created_at = product.created_at || new Date();
    this.updated_at = product.updated_at || new Date();
  }
}