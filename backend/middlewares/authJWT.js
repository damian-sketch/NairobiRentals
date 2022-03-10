import jwt from 'jsonwebtoken';

export const verifyToken =(token) => {
    try{
        const verify = jwt.verify(token, process.env.JWT);
        if(verify.type === 'user'){
            return true
        }
        return false
       

    } catch (error) {
        console.log(JSON.stringify(error))
    }
}