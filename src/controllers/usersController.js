import userService from "../services/userService.js";

export const loginController = async (req, res) => {
  const { user } = req;
  const { _id } = user;
  console.log(_id);
  
  const result = userService.login(_id);
  res.json({
    message: "Đăng nhập thành công",
    result,
  });
};