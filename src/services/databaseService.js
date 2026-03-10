import { MongoClient, ObjectId } from "mongodb";
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

      await databaseService.user.insertOne({
        _id: new ObjectId(),
        name: "Admin",
        avatar: "https://cdn11.dienmaycholon.vn/filewebdmclnew/public/userupload/files/Image%20FP_2024/avatar-cute-3.jpg",
        email: "admin@gmail.com",
        password: sha256("Admin@123"),
      });
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
  get refresh_token() {
    return this.db.collection("refresh_token");
  }
}
const databaseService = new DatabaseService();
export default databaseService;
