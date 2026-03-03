import { body, checkSchema } from "express-validator";
import { validate } from "../utils/validator.js";
import databaseService from "../services/databaseService.js";
import { sha256 } from "../utils/crypto.js";
import { config } from "dotenv";

import _ from "lodash";
config();

const passwordSchema = {
  notEmpty: {
    errorMessage: "Mật khẩu không được bỏ trống!",
  },
  isString: "Mật khẩu phải là kí tự!",
  isLength: {
    options: {
      min: 6,
      max: 50,
    },
    errorMessage: "Mật khẩu ít nhất 6 kí tự!",
  },
}

export const loginValidator = validate(
  checkSchema(
    {
      email: {
        isEmail: true,
        trim: true,
        custom: {
          options: async (value, { req }) => {
            const user = await databaseService.user.findOne({
              email: value,
              password: sha256(req.body.password),
            });
            console.log("làds",user);
            
            if (user === null) {
              throw new Error("Tài khoản hoặc email không hợp lệ!");
            }
            req.user = user;
            return true;
          },
        },
      },
      password:passwordSchema
    },
    ["body"]
  )
);

