import { HTTP_STATUS } from "../constants/httpStatus.js";
import userService from "../services/userService.js";
// Lấy thông tin User
export const getUserInfo = async (req, res) => {
  const { user } = req;
  const { user_id } = user;
  const result = await userService.getUserInfo(user_id);
  return res.status(HTTP_STATUS.OK).json({
    message: "Thành công!",
    success: true,
    data: result,
  });
};

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
  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: "Đăng nhập thành công",
    data: user,
  });
};

export const logoutController = async (req, res) => {
  const token = req.cookies.refresh_token;
  await userService.logout(token);
  res.clearCookie("refresh_token");
  return res.status(HTTP_STATUS.OK).json({
    success: true,
    message: "Đăng xuất thành công",
  });
};
export const refreshTokenController = async (req, res) => {
  // Lấy userId từ middleware
  const { user_id } = req.decoded_refreshToken;
  const result = await userService.refreshToken(user_id);
  res.cookie("access_token", result, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 0.5 * 60 * 1000, // 15 phút
  });
  res.json(HTTP_STATUS.OK).json({
    success: true,
    message: "OK",
  });
};
