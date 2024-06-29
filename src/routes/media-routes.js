import { Router } from "express";
import controllers from "../controller/index";
const router = Router();
const { mediaControllers } = controllers;

router.post(
    '/media/upload/:mediaFor/:mediaType', (request, response, next) => {
        Object.assign(request.params, { apiName: 'media' });
        next();
    }, (request, response, next) => {
        const { params } = request;
        Object.assign(request.body, params);
        next();
    },
    mediaControllers.uploadMedia
)
export default router;