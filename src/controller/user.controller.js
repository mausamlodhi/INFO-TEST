import httpStatus from "http-status";
import repositories from "../repositories";
const { userRepository } = repositories;

export default {
    async singUp(req,res,next){
        try{
            const result = await userRepository.signUp(req);
            if(result){
                res.status(httpStatus.OK).json({
                    message:"Sign up success",
                    data:result,
                    success:false
                })
            }else{
                res.status(httpStatus.BAD_REQUEST).json({
                    message:"Something went wrong",
                    data:null,
                    success:false
                })
            }
        }catch(error){
            console.log(error);
            res.status(httpStatus.BAD_REQUEST).json({
                message:"Something went wrong",
                data:null,
                success:false
            })
        }
    },
    async logIn(req,res,next){
        try{
            const result = await userRepository.logIn(req);
            if(result){
                res.status(httpStatus.OK).json({
                    message:"Log in success",
                    data:result,
                    success:false
                })
            }else{
                res.status(httpStatus.BAD_REQUEST).json({
                    message:"Something went wrong",
                    data:null,
                    success:false
                })
            }
        }catch(error){
            console.log(error);
            res.status(httpStatus.BAD_REQUEST).json({
                message:"Something went wrong",
                data:null,
                success:false
            })
        }
    },
    async updateUserDetaisl(req,res,next){
        try{
            const result = await userRepository.updateUserDetails(req,req.user);
            if(result){
                res.status(httpStatus.OK).json({
                    message:'Profile update success',
                    data:null,
                    success:true
                })    
            }else{
                res.status(httpStatus.BAD_REQUEST).json({
                    message:'Something went wrong',
                    data:null,
                    success:false
                })
            }
        }catch(error){
            console.log(error);
            res.status(httpStatus.BAD_REQUEST).json({
                message:'Something went wrong',
                data:null,
                success:false
            })
        }
    }
}