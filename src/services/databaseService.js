import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import { sha256 } from "../utils/crypto.js";

dotenv.config();
class DatabaseService {
  constructor() {
    this.client = new MongoClient(process.env.MONGO_URI);
    this.db = this.client.db("products");
  }
  async connect() {
    try {
      await this.db.command({ ping: 1 });
      console.log(
        "Pinged your deployment. You successfully connected to MongoDB!",
      );
      
      //   await databaseService.user.insertOne({
      //   _id: "123",
      //   email: "admin@gmail.com",
      //   password: sha256("123456"),
      // });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  get user() {
    return this.db.collection("users");
  }

  get products() {
    return this.db.collection("products");
  }
  get categories() {
    return this.db.collection("categories");
  }
}
const databaseService = new DatabaseService();
export default databaseService;
