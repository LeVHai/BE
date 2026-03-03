import { config } from "dotenv";
config();
class UserService {
 
  async login({ user_id}) {
  }
  async logout(token) {}
}

const userService = new UserService();
export default userService;
