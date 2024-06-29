import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
export default {
    async encryptPassword(password){
        try{
            const salt = await bcrypt.genSalt()
            return bcrypt.hash(password,salt);
        }catch(error){
            console.log('Error ',error);
        }
    },
    comparePassword(newPassword,storedPassword){
        try{
            return bcrypt.compare(newPassword,storedPassword);
        }catch(error){
            console.log('Error : ',error);
        }
    },
    createToken(payload){
        return jwt.sign(payload,'jwt_secret_key_for_info',{
            expiresIn:'1h'
        });
    },
    verifyToken(token){
        return jwt.verify(token,'jwt_secret_key_for_info')
    }
}