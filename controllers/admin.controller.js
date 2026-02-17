import { add_product, delete_manufacturer, delete_product, femaleBeautyProducts, manufacturers } from "../functions/data.js";
import { generateToken, verifyToken } from "../functions/functions.js";

export const login_controller = (req,res)=>{
    try {
        const {username, password} = req.body;
        let token;
        if(username==="ajit29" && password ==="Ajit@2929"){
            token = generateToken({username, password});
            console.log(token);
           return res.status(200).json({token,message:"success"})
        }
        else{
            return res.status(400).json({message:"incorrect credential"});
        }
    } catch (error) {
        return res.send("error")
    }
}

export const get_products_controller = (req,res)=>{
    try {
        const token = req.body?.token;
        if(!token) res.status(400).json({message:"token not found"})
        const result = verifyToken(token);
        if(!result) return res.status(400).json({message:"incorrect token"})

        return res.status(200).json(femaleBeautyProducts)
    } catch (error) {
        return res.status(400).json({message:"Server Error"})
    }
    
}

export const get_manufacturers_details = (req,res)=>{
    try {
        const token = req.body?.token;
        if(!token) res.status(400).json({message:"token not found"})
        const result = verifyToken(token);
        if(!result) return res.status(400).json({message:"incorrect token"})

        return res.status(200).json(manufacturers)
    } catch (error) {
        return res.status(400).json({message:"Server Error"})
    }
}

export const delete_products_controller = (req,res) =>{
    try {
        const token = req.body?.token;
        let idToDelete = req.body?.item_id;
        if(!idToDelete) return res.status(400).josn({message:"no deleting item id is provided in body"})
        if(!token) return res.status(400).json({message:"token not found"})
        const result = verifyToken(token);
        if(!result) return res.status(400).json({message:"incorrect token"})
        idToDelete = Number(idToDelete)
        delete_product(idToDelete);
        // console.log(femaleBeautyProducts)
        return res.send(femaleBeautyProducts)


    } catch (error) {
        console.log("error",error)
        return res.send("server issue")
    }
}

export const delete_manufacturer_controller = (req,res) =>{
    try {
        const token = req.body?.token;
        let idToDelete = req.body?.item_id;
        if(!idToDelete) return res.status(400).josn({message:"no deleting item id is provided in body"})
        if(!token) return res.status(400).json({message:"token not found"})
        const result = verifyToken(token);
        if(!result) return res.status(400).json({message:"incorrect token"})
        idToDelete = Number(idToDelete)
        delete_manufacturer(idToDelete);
        // console.log(femaleBeautyProducts)
        return res.send(manufacturers);


    } catch (error) {
        console.log("error",error)
        return res.send("server issue")
    }
}

export const add_product_controller = (req,res) =>{
    try {
        const token = req.body?.token;
        const product = req.body?.product;
        if(!product || Array.isArray(product) || typeof product !== "object") return res.status(400).json({message:"adding product type must be an object"})
        if(!token) return res.status(400).json({message:"token not found"})
        const result = verifyToken(token);
        if(!result) return res.status(400).json({message:"incorrect token"})
        console.log(product)
        add_product(product,res);
        // console.log(femaleBeautyProducts)
        return res.status(200).json({message:"product added success"});


    } catch (error) {
        console.log("error",error);
        return res.send("server issue")
    }
}
