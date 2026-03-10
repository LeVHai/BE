import { checkSchema } from "express-validator";
import { validate } from "../utils/validator.js";
import formidable from "formidable";
import { ErrorWithStatus } from "../models/errors.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";
import multer from "multer";

const productValidator = {
  name: {
    notEmpty: {
      errorMessage: "Tên sản phẩm không được bỏ trống",
    },
    isLength: {
      options: { min: 3 },
      errorMessage: "Tên phải có ít nhất 3 ký tự",
    },
  },

  description: {
    optional: true,
    isLength: {
      options: { max: 1000 },
      errorMessage: "Mô tả tối đa 1000 ký tự",
    },
  },

  price: {
    notEmpty: {
      errorMessage: "Giá không được bỏ trống",
    },
    isFloat: {
      options: { min: 0 },
      errorMessage: "Giá phải là số >= 0",
    },
    toFloat: true,
  },

  quantity: {
    notEmpty: {
      errorMessage: "Số lượng không được bỏ trống",
    },
    isInt: {
      options: { min: 0 },
      errorMessage: "Số lượng phải lớn hơn 0",
    },
    toInt: true,
  },

  category: {
    notEmpty: {
      errorMessage: "Danh mục không được bỏ trống",
    },
  },
  status: {
    notEmpty: {
      errorMessage: "Trạng thái không được bỏ trống",
    },
    isIn: {
      options: [["active", "inactive"]],
      errorMessage: "Status chỉ được là active hoặc inactive",
    },
  },
};

export const ObjectIdValidator = validate(
  checkSchema({
    id: {
      in: ["params"],
      notEmpty: {
        errorMessage: "Product ID không được bỏ trống",
      },
      isMongoId: {
        errorMessage: "Product ID không hợp lệ",
      },
    },
  }),
);
export const createProductValidator = validate(
  checkSchema({
    ...productValidator,
  }),
);

// export const uploadImageMiddleware = (req, res, next) => {
//   const form = formidable({
//     multiples: false,
//     maxFiles: 1,
//     maxFileSize: 5 * 1024 * 1024, // 5MB
//     keepExtensions: true,
//     filter: function ({ mimetype }) {
//       const valid = mimetype && mimetype.includes("image");
//       if (!valid) {
//         form.emit("error", new Error("Chỉ cho phép tải ảnh lên!"));
//       }
//       return valid;
//     },
//   });
//   form.parse(req, (err, fields, files) => {
//     if (err) {
//       return next(err);
//     }
//     if (!files.imageURL) {
//       return next(
//         new ErrorWithStatus({
//           message: "Image không được bỏ trống",
//           status: 422,
//         }),
//       );
//     }

//     // chuyển fields array => string {key :[value]} =>{key : value}
//     req.body = Object.fromEntries(
//       Object.entries(fields).map(([key, value]) => [key, value[0]]),
//     );
//     console.log(files.imageURL);

//     req.file = files.imageURL;
//     next();
//   });
// };

export const uploadImageOptional = (req, res, next) => {
  const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
      fileSize: 5 * 1024 * 1024,
      files: 1
    },
    fileFilter(req, file, cb) {
      if (!file.mimetype.startsWith("image")) {
        return cb(new ErrorWithStatus({
          message:"File phải là ảnh",
          status: HTTP_STATUS.UNPROCESSABLE_ENTITY
        }))
      }
      cb(null, true)
    }
  }).single("image")

  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_FILE_COUNT") {
        return next(new ErrorWithStatus({
          message:"Chỉ được tải lên 1 ảnh!",
          status: HTTP_STATUS.UNPROCESSABLE_ENTITY
        }))
      }
    }
    if (err) return next(err)
    next()
  })
}
export const updateProductValidator = validate(
  checkSchema({
    ...productValidator,
    imageURL: {
      optional: true,
      isURL: {
        errorMessage: "URL hình ảnh không hợp lệ!",
      },
    },
  }),
);
export const uploadImageRequired = (req, res, next) => {
  uploadImageOptional(req, res, function (err) {
    if (err) return next(err);
    if (!req.file) {
      return next(new ErrorWithStatus({
        message: "Ảnh không được bỏ trống",
        status: HTTP_STATUS.UNPROCESSABLE_ENTITY
      }))
    }

    next()
  })
}
