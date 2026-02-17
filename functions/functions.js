import jwt from "jsonwebtoken"


export const generateToken = (payload)=>{
    const token = jwt.sign(payload, process.env.JWT_SECRET,{
        expiresIn: "1d"
    } )
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