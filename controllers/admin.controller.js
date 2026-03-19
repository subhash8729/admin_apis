import { add_product, delete_manufacturer, delete_product, generateToken, verifyToken } from "../functions/functions.js";
import deals from "../deals.json" with { type: "json" }
import fs from "fs"
import { database } from "../functions/db.js";

const users = database.collection('users')
const manufacturers = database.collection('manufacturers')
const products_collection = database.collection('products')
export const login_controller = async (req, res) => {
    try {
        const { username, password } = req.body;
       
        
        const data = await users.findOne({ username, password })
        
        if (data) {
            const token = generateToken({ username, password });
            res.cookie("token", token, {
                httpOnly: true,
                secure: true,      // true if using HTTPS
                maxAge: 24 * 60 * 60 * 1000
            });
            return res.status(200).json({ token, username, email: username + "@gmail.com", message: "success" })
        }
        else {
            return res.status(400).json({ message: "incorrect credential" });
        }

    } catch (error) {
        console.log("🔥 LOGIN ERROR:", error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const get_products_controller = async (req, res) => {
    try {
        const category = req.query?.category

        if (category) {
            const data = await products_collection.find({ category }).toArray();
            return res.status(200).json({
                status: true,
                category: category,
                products: data
            })
        }
        const data = await products_collection.find().toArray();
        return res.status(200).json({ success:true, category:"all", data:data })
    } catch (error) {
        return res.status(400).json({ success:false, message:error.message })
    }

}

export const get_manufacturers_details = async (req, res) => {
    try {
        const data = await manufacturers.find().toArray()
        return res.status(200).json({ success:true, data:data })
    } catch (error) {
        console.log("error found", error.message)
        return res.status(400).json({ success:false, message:error.message })
    }
}

export const delete_products_controller = async (req, res) => {
    try {

        let idToDelete = req.body?.item_id;
        if (!idToDelete) return res.status(400).json({ message: "no deleting item id is provided in body" })
        const result = await products_collection.deleteOne({ id: idToDelete })
        // return res.status(200).json("delete success");
    
        if(result.deletedCount === 0) return res.status(400).json({message:"the perticular id does not exists in database"})
        return res.status(200).json({ success: true, message: "Delete success" });

    } catch (error) {
        // return res.status(500).json("server issue")
        res.status(500).json({ success: false, message: "Server issue" });
    }
}



export const delete_manufacturer_controller = (req, res) => {
    try {


        let idToDelete = req.body?.item_id;

        if (!idToDelete) {
            return res.status(400).json({ message: "no deleting item id is provided in body" })
        }
        delete_manufacturer(idToDelete);
        const data = JSON.parse(fs.readFileSync("manufacturers.json", "utf-8"));
        return res.send(data);

    } catch (error) {
        console.log("error", error)
        return res.status(500).json({
            success: false,
            message: "Server issue"
        });
    }
}

export const add_product_controller = async (req, res) => {
    try {
        const product = req.body?.product;
        if (!product || typeof product !== "object" || Array.isArray(product)) return res.status(400).json({ message: "adding product type must be an object" })
        await products_collection.insertOne(product)
        return res.status(200).json({
            success: true,
            message: "insertion success"
        });

    } catch (error) {
        console.log("error in add_product_controller ", error.message)
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const get_deals_controller = (req, res) => {
    try {
        const token = req.body?.token;
        if (!token) return res.status(400).json({ message: "token not found" })
        const result = verifyToken(token);
        if (!result) return res.status(400).json({ message: "incorrect token" })
        const data = JSON.parse(fs.readFileSync("deals.json", "utf-8"));
        return res.status(200).json(data)
    } catch (error) {
        return res.status(400).json({ message: "Server Error" })
    }
}
