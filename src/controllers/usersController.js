
export const loginController = async (req, res) => {
  const { user } = req;
  const { _id } = user;
  const result = '';
  res.json({
    message: "Đăng nhập thành công",
    result,
  });
};