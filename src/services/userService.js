import { config } from "dotenv";
import { TOKEN } from "../constants/type.js";
import { signToken } from "../utils/jwt.js";
config();
class UserService {
  signAccessToken({ user_id }) {
    return signToken({
      payload: { user_id, token_type: TOKEN.ACCESS_TOKEN },
      privateKey: process.env.JWT_SECRET_ACCESS_TOKEN,
      options: {
        algorithm: "HS256",
        expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
      },
    });
  }
  signRefreshToken({ user_id }) {
    return signToken({
      payload: { user_id, token_type: TOKEN.REFRESH_TOKEN },
      privateKey: process.env.JWT_SECRET_REFRESH_TOKEN,
      options: {
        algorithm: "HS256",
        expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
      },
    });
  }
  signAccessTokenAndRefreshToken({ user_id }) {
    return Promise.all([
      this.signAccessToken({ user_id }),
      this.signRefreshToken({ user_id }),
    ]);
  }
  async login({ user_id}) {
    const [access_token, refresh_token] =
      await this.signAccessTokenAndRefreshToken({
        user_id:user_id,
      });
    return { access_token, refresh_token };
  }
  async logout(token) {}
}

const userService = new UserService();
export default userService;
