import { Product } from "../schemas/productSchema.js";
import databaseService from "./databaseService.js";
import { ObjectId } from "mongodb";
export const seedProducts = async () => {
  const CATEGORIES = {
    1: "Quần",
    2: "Áo",
    3: "Váy",
    4: "Phụ kiện",
    5: "Giày",
  };
  const products = [];

  const categoryIds = Object.keys(CATEGORIES);

  for (let i = 1; i <= 40; i++) {
    const category =
      categoryIds[Math.floor(Math.random() * categoryIds.length)];

    products.push(
      new Product({
        _id: new ObjectId(),
        name: `Sản phẩm ${i}`,
        description: `Mô tả sản phẩm ${i}`,
        price: Math.floor(Math.random() * 500000) + 50000,
        quantity: Math.floor(Math.random() * 100),
        image: `https://picsum.photos/200?random=${i}`,
        category: category,
        status: "active",
      }),
    );
  }

  await databaseService.products.insertMany(products);

  console.log("Đã thêm 30 sản phẩm");
};
class ProductService {
  async getProductList(page, limit) {
    // seedProducts()
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
    console.log(productId, payload, "............................");
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
  async searchProduct({ keyword, limit, page }) {
    const query = {
      name: {
        $regex: keyword,
        $options: "i",
      },
    };

    const products = await databaseService.products
      .find(query)
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await databaseService.products.countDocuments(query);

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
}
const productService = new ProductService();
export default productService;
