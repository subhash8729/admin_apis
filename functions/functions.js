import jwt from "jsonwebtoken"


export const generateToken = (payload)=>{
    console.log(process.env.JWT_SECRET)
    const token = jwt.sign(payload, process.env.JWT_SECRET )
    return token;
}

export const verifyToken = (token) =>{
    try {
        jwt.verify(token,process.env.JWT_SECRET)
        return true
    } catch (error) {
        return false
    }
}