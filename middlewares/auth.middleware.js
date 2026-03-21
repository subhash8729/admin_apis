import jwt from "jsonwebtoken"
export const verifyJWT = (req ,res ,next) => {
    try {
        const {token} = req.cookies;// cookies me se data liya
        console.log("The token is ", req.cookies?.token);
        console.log("JWT secret is",process.env.JWT_SECRET);
        jwt.verify(token, process.env.JWT_SECRET) //verification
        next();
    } catch (error) {
        console.log("error in vefication of token",error.message)
        return res.status(400).json({ message: "Unathorized token or token not provided" })
    }
};
