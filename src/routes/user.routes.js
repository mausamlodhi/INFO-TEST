import { Router } from "express";
import controllers from '../controller/index';
import middlewares from '../middleware/index';
const { userController } = controllers
const {authMiddleware} = middlewares
const router = Router();

router.post(
    '/signup',
    userController.singUp
);

router.post(
    '/login',
    userController.logIn
);

router.post(
    '/update-profile',
    authMiddleware,
    userController.updateUserDetaisl
)

export default router;