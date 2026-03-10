import { Product } from "../schemas/productSchema.js";
import databaseService from "./databaseService.js";
import { ObjectId } from "mongodb";
class ProductService {
  async getProductList(page, limit) {
    const skip = (page - 1) * limit;
    const [products, total] = await Promise.all([
      databaseService.products.find({}).skip(skip).limit(limit).toArray(),
      databaseService.products.countDocuments({}),
    ]);

    return {
      data: products,
      pagination: {
        total,
        page,
        limit,
        totalPage: Math.ceil(total / limit),
      },
    };
  }
  async getProduct(productId) {
    const result = await databaseService.products.findOne({
      _id: new ObjectId(productId),
    });
    return result;
  }
  async createProduct(payload) {
    const product = new Product({
      _id: new ObjectId(),
      ...payload,
    });
    await databaseService.products.insertOne(product);
    return product;
  }
  async updateProduct(productId, payload) {
    console.log(productId,payload,"............................");
    
    const result = await databaseService.products.findOneAndUpdate(
      { _id: new ObjectId(productId) },
      {
        $set: {
          ...payload,
          updated_at: new Date(),
        },
      },
      {
        returnDocument: "after",
      },
    );
    return result;
  }
  async deleteProduct(productId) {
    const result = await databaseService.products.deleteOne({
      _id: new ObjectId(productId),
    });

    return result.deletedCount > 0;
  }
}
const productService = new ProductService();
export default productService;
