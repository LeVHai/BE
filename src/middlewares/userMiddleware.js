import { body, checkSchema } from "express-validator";
import { validate } from "../utils/validator.js";
import databaseService from "../services/databaseService.js";
import { sha256 } from "../utils/crypto.js";
import { config } from "dotenv";

import _ from "lodash";
import { wrapHandleError } from "../utils/handles.js";
import { verifyToken } from "../utils/jwt.js";
config();

const passwordSchema = {
  notEmpty: {
    errorMessage: "Mật khẩu không được bỏ trống!",
  },
  isString: "Mật khẩu phải là kí tự!",
  // isLength: {
  //   options: {
  //     min: 6,
  //     max: 50,
  //   },
  //   errorMessage: "Mật khẩu ít nhất 6 kí tự!",
  // },
};
//validate form login
export const loginValidator = validate(
  checkSchema(
    {
      email: {
        isEmail: {
          errorMessage: "Tài khoản phải là email!",
        },
        trim: true,
        custom: {
          options: async (value, { req }) => {
            const user = await databaseService.user.findOne(
              {
                email: value,
                password: req.body?.password ? sha256(req.body?.password) : "",
              },
              { projection: { password:0 } },
            );
            if (user === null) {
              throw new Error("Tài khoản hoặc mat khau không hợp lệ!");
            }
            req.user = user;
            return true;
          },
        },
      },
      password: passwordSchema,
    },
    ["body"],
  ),
);
//validate token
export const authMiddleware = wrapHandleError(async (req, res, next) => {
  const token = req.cookies?.access_token;
  console.log(token);
  
  if (!token || token == undefined) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
  const decoded = await verifyToken({
    token,
    secretOrPublicKey: process.env.JWT_SECRET_ACCESS_TOKEN,
  });
  console.log(decoded);
  
  req.user = decoded;
  next();
});

export const refreshTokenValidator = validate(
  checkSchema({
    refresh_token: {
      trim: true,
      custom: {
        options: async (value, { req }) => {
          const refresh_token = req.cookies.refresh_token;
          console.log("dfadsfds",refresh_token);
          
          if (!refresh_token) {
            throw new ErrorWithStatus({
              message: "Refresh token không được trống!",
              status: 401,
            });
          }
          
          console.log("ư");
            console.log(refresh_token);
          
          try {
            console.log("sdf");
            console.log(refresh_token);
            console.log(process.env.JWT_SECRET_REFRESH_TOKEN);
            
            const decoded_refreshToken = await verifyToken({
              token: refresh_token,
              secretOrPublicKey: process.env.JWT_SECRET_REFRESH_TOKEN,
            });
            console.log("dsfafadsfdsf");
            
            const res = await databaseService.refresh_token.findOne({
              refresh_token: refresh_token,
            });
            console.log("dsafds");
            // Lỗi thường (1)
            if (res == null) {
              console.log("dsfd");
              throw new ErrorWithStatus({
                message: "Refresh token không tồn tại!",
                status: 401,
              });
            }
            console.log("a");

            req.decoded_refreshToken = decoded_refreshToken;
          } catch (error) {
            //lỗi của JSON Web token (2)
            if (error instanceof JsonWebTokenError) {
              throw new ErrorWithStatus({
                message: "Refresh token không hợp lệ",
                status: 401,
              });
            }
            throw error;
          }
          return true;
        },
      },
    },
  }),
);
