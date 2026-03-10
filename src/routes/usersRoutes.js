import {Router} from 'express'
import { wrapHandleError } from '../utils/handles.js'
import { getUserInfo, loginController, logoutController, refreshTokenController } from '../controllers/usersController.js'
import { authMiddleware, loginValidator, refreshTokenValidator } from '../middlewares/userMiddleware.js'
const usersRouter = Router()
/*
Description Login a user
Path: /login
Method: Post 
Body: {email, password}
*/

usersRouter.get('/',authMiddleware,wrapHandleError(getUserInfo))
usersRouter.post('/login',loginValidator,wrapHandleError(loginController))
usersRouter.post('/logout',authMiddleware,refreshTokenValidator,wrapHandleError(logoutController))
usersRouter.post('/refresh-token',refreshTokenValidator,wrapHandleError(refreshTokenController))
export default usersRouter