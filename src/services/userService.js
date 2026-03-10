import { config } from "dotenv";
import { TOKEN } from "../constants/type.js";
import { signToken, verifyToken } from "../utils/jwt.js";
import databaseService from "./databaseService.js";
import { ObjectId } from "mongodb";
config();
class UserService {
  //Tao chuoi token
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
  //Tao chuoi token
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

  async getUserInfo(user_Id) {
    const res = await databaseService.user.findOne(
      { _id: new ObjectId(user_Id) },
      { projection: { password: 0 } },
    );
    return res;
  }
  async login(user_id) {
    const [access_token, refresh_token] =
      await this.signAccessTokenAndRefreshToken({
        user_id: user_id,
      });
    await databaseService.refresh_token.findOneAndUpdate(
      { user_id },
      {
        $set: {
          refresh_token,
          updated_at: new Date(),
        },
      },
      { upsert: true },
    );

    return { access_token, refresh_token };
  }

  async logout(token) {
    const a = await databaseService.refresh_token.deleteOne({
      refresh_token: token,
    });
    return true;
  }

  async refreshToken(user_id) {
    const access_token = await this.signAccessToken({ user_id });
    return access_token;
  }
}

const userService = new UserService();
export default userService;
