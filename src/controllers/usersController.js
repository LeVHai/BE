import { HTTP_STATUS } from "../constants/httpStatus.js";
import userService from "../services/userService.js";

export const loginController = async (req, res) => {
  const { user } = req;
  const { _id } = user;
  const result = await userService.login(_id);
  res.cookie("access_token", result.access_token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 15 * 60 * 1000, // 15 phút
  });
  res.cookie("refresh_token", result.refresh_token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 ngày
  });

  res.json({
    message: "Đăng nhập thành công",
    status: HTTP_STATUS.OK,
  });
};
