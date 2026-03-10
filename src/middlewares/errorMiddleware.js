import _ from "lodash";
import { HTTP_STATUS } from "../constants/httpStatus.js";

export const defaultErrorHandler = (err, req, res, next) => {
  if(err.status){
   return res.status(err.status).json(_.omit(err,'status'));
  }
  console.log(err);
  res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    message: err.message,
    errorInfo: err
  });
};
