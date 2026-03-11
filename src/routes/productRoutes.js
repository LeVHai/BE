import { Router } from "express";
import { wrapHandleError } from "../utils/handles.js";
import {
  createProductValidator,
  ObjectIdValidator,
  updateProductValidator,
  uploadImageOptional,
  uploadImageRequired,
} from "../middlewares/productMiddleware.js";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProductList,
  searchProduct,
  updateProduct,
} from "../controllers/productController.js";
import { authMiddleware } from "../middlewares/userMiddleware.js";
const productRouter = Router();
productRouter.get("/list", authMiddleware, wrapHandleError(getProductList));
productRouter.get(
  "/:id",
  authMiddleware,
  ObjectIdValidator,
  wrapHandleError(getProduct),
);
productRouter.post(
  "/",
  authMiddleware,
  uploadImageRequired,
  createProductValidator,
  wrapHandleError(createProduct),
);
productRouter.put(
  "/:id",
  authMiddleware,
  uploadImageOptional,
  updateProductValidator,
  ObjectIdValidator,
  wrapHandleError(updateProduct),
);
productRouter.delete(
  "/:id",
  authMiddleware,
  ObjectIdValidator,
  wrapHandleError(deleteProduct),
);
productRouter.get(
  "/search",
  authMiddleware,
  wrapHandleError(searchProduct),
);

export default productRouter;
