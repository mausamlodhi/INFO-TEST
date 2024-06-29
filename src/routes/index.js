import { Router } from "express";
import httpStatus from "http-status";
import user from "./user.routes"
const router = Router();
const register = (app)=>{
    app.use(router);
    router.use('/api',[
        user,
        
    ])
    app.use((error,req,res,next)=>{
        if(error){
            res.status(httpStatus.NOT_FOUND).json({
                success:false,
                message:"Not found",
                data:null
            })
        }else{
            next();
        }
    })
};
export default register;