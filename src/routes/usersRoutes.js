import {Router} from 'express'
import { wrapHandleError } from '../utils/handles.js'
import { loginController } from '../controllers/usersController.js'
import { loginValidator } from '../middlewares/userMidleware.js'
const usersRouter = Router()
/*
Description Login a user
Path: /login
Method: Post 
Body: {email, password}
*/
usersRouter.post('/login',loginValidator,wrapHandleError(loginController))
export default usersRouter