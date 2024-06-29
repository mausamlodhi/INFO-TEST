import httpStatus from "http-status";
import tokenMethodes from "../common/index"
import repositories from "../repositories";
const { userRepository } = repositories
const authValidateRequest = async(req,res,next)=>{
    try{
        if(req.headers && req.headers.authorization){
            const parts = req.headers.authorization.split(' ')
            if(parts.length===2){
                if(/^Bearer$/i.test(parts[0])){
                    const decodedToken = await tokenMethodes.verifyToken(parts[1]);
                    if(decodedToken){
                        const user = userRepository.findUserByToken(parts[1]);
                        if(user){
                            req.user = user;
                            next()
                        }else{
                            res.status(httpStatus.BAD_REQUEST).json({
                                message:'Token expired',
                                success:false,
                                data:null
                            })
                        }
                    }else{
                        res.status(httpStatus.BAD_REQUEST).json({
                            message:'Token expired',
                            success:false,
                            data:null
                        })
                    }
                }else{
                    res.status(httpStatus.BAD_REQUEST).json({
                        message:'Invalild token',
                        success:false,
                        data:null
                    })
                }
            }else{
                res.status(httpStatus.BAD_REQUEST).json({
                    message:'Invalid token',
                    success:false,
                    data:null
                })    
            }
        }else{
            res.status(httpStatus.BAD_REQUEST).json({
                message:'Un-authorized access',
                success:false,
                data:null
            })
        }
    }catch(error){
        console.log(error);
        res.status(httpStatus.BAD_REQUEST).json({
            message:'Token not found',
            success:false,
            data:null
        })
    }
}
export default authValidateRequest