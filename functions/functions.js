import jwt from "jsonwebtoken"
import fs from "fs";
import manufacturers from "../manufacturers.json" with { type: "json" }
import femaleBeautyProducts from "../femaleBeautyProducts.json" with { type: "json" }

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
};
export const delete_product = (id)=>{
   const filtered =  JSON.parse(fs.readFileSync("femaleBeautyProducts.json","utf-8")).filter(value => value.id !== id)
   fs.writeFileSync("femaleBeautyProducts.json",JSON.stringify(filtered));
}

export const delete_manufacturer = (id)=>{
   const filtered =  JSON.parse(fs.readFileSync("manufacturers.json","utf-8")).filter(value => value.id !== id)
   fs.writeFileSync("manufacturers.json",JSON.stringify(filtered));
}

export const add_product = (product, res) => {
    if (!product || Array.isArray(product) || typeof product !== "object") {
        return res.status(400).json({ message: "Product must be an object" })
    }
    const fileDataAsArray = JSON.parse(fs.readFileSync("femaleBeautyProducts.json","utf-8"));
    fileDataAsArray.push(product);

    fs.writeFileSync("femaleBeautyProducts.json",JSON.stringify(fileDataAsArray));
}