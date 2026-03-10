import { HTTP_STATUS } from "../constants/httpStatus.js";
import productService from "../services/productService.js";
import { uploadImageStream } from "../utils/uploadImage.js";

//Product
export const getProductList = async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const result = await productService.getProductList(page, limit);
  return res.status(HTTP_STATUS.OK).json({
    success: true,
    message: "Thành công.",
    ...result,
  });
};
export const getProduct = async (req, res) => {
  const productID = req.params.id;
  const result = await productService.getProduct(productID);
  if (result == null) {
    return res.status(HTTP_STATUS.NOT_FOUND).json({
      success: false,
      message: "Sản phẩm không tồn tại!!",
    });
  }
  return res.status(HTTP_STATUS.OK).json({
    success: true,
    message: "Thành công.",
    data: result,
  });
};

export const createProduct = async (req, res) => {
  const data = req.body;
  let imageUrl
  // upload image
  if (req.file) {
    const result = await uploadImageStream(req.file);
    imageUrl = result.secure_url;
  }
  const result = await productService.createProduct({
    ...data,
    image: imageUrl,
  });

  return res.status(HTTP_STATUS.CREATED).json({
    success: true,
    message: "Tạo sản phẩm thành công!",
    data: result,
  });
};

export const updateProduct = async (req, res) => {
  const data = req.body;
  const productID = req.params.id;
  if (req.file) {
    const result = await uploadImageStream(req.file);
    data.image = result.secure_url;
  }
  const result = await productService.updateProduct(productID, data);
  if (result == null) {
    return res.status(HTTP_STATUS.NOT_FOUND).json({
      success: false,
      message: "Sản phẩm không tồn tại!",
    });
  }
  return res.status(HTTP_STATUS.CREATED).json({
    success: true,
    message: "Cập nhật sản phẩm thành công!",
    data: result,
  });
};
export const deleteProduct = async (req, res) => {
  const productId = req.params.id;
  const result = await productService.deleteProduct(productId);
  if (!result) {
    return res.status(HTTP_STATUS.NOT_FOUND).json({
      success: false,
      message: "Sản phẩm không tồn tại!",
    });
  }
  return res.status(HTTP_STATUS.OK).json({
    success: true,
    message:"Xóa thành công!"
  });
};
