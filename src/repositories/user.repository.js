import models from "../models/index.js";
import commonServices from "../common/index" 
const {user, userDetails, address} = models;

export default {
    async signUp(req){
        try{
            const {
                body:{
                    firstName,
                    lastName,
                    email,
                    mobile,
                    password,
                    currentAddress
                }
            } = req;
            console.log(firstName,
                lastName,
                email,
                mobile,
                password,
                address);
            const isUserCreated = await user.create({firstName,lastName});
            if(isUserCreated){
                const encryptedPassword = await commonServices.encryptPassword(password);
                console.log(encryptedPassword);
                await Promise.all([
                    userDetails.create({userId:isUserCreated.dataValues.id,password:encryptedPassword,email,mobile}),
                    address.create({address:currentAddress,userId:isUserCreated.dataValues.id})
                ]);
                return true
            }else{
                return false
            }
        }catch(error){
            console.log(error);
        }
    },
    async logIn(req){
        try{
            const {
                body:{
                    email,
                    password
                }
            } = req;
            const isUserExists = await userDetails.findOne({
                where:{email},
            })
            if(isUserExists){
                const checkPassword = commonServices.comparePassword(password,isUserExists.dataValues.password)
                if(checkPassword){
                    const token = commonServices.createToken(isUserExists.dataValues);
                    const updateUser = await userDetails.update({token},{where:{userId:isUserExists.dataValues.userId}});
                    return {
                        ...isUserExists,
                        token
                    }
                }
            }else{
                return false
            }
        }catch(error){
            console.log(error);
        }
    },
    async findUserByToken(token){
        try{
            const isUser = await user.findOne({where:token});
            return isUser
        }catch(error){
            console.log("Error : ",error);
        }
    },
    async updateUserDetails(req,user){
        try{
            const {
                body:{
                    firstName,
                    lastName,
                    mobile,
                    password
                }
            } = req;
            const encryptedPassword = commonServices.encryptPassword(password);
            const [userUpdate,userDetailsUpdate] = await Promise.all([
                user.update({firstName,lastName},{where:{id:user.userId}}),
                userDetails.update({mobile,password:encryptedPassword},{userId:user.userId})
            ])
            if(userUpdate&&userDetailsUpdate){
                return true;
            }else{
                return false
            }
        }catch(error){
            console.log(error);
            throw Error(error);
        }
    }
}