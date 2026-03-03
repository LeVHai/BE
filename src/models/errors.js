import { HTTP_STATUS } from "../constants/httpStatus.js"

 export class ErrorWithStatus{
    constructor({message, status}){
        this.message = message
        this.status = status
    }
 }
 export class  EntityError extends ErrorWithStatus{
    constructor({message = 'Validator error',error}){
        super({message, status: HTTP_STATUS.UNPROCESSABLE_ENTITY})
        this.error = error
    }
 }