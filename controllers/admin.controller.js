import { add_product, delete_manufacturer, delete_product, generateToken, verifyToken } from "../functions/functions.js";
import deals from "../deals.json" with { type: "json" }
import fs from "fs"

export const login_controller = (req, res) => {
    try {
        const { username, password } = req.body;
        let token;
        if (username === "ajit29" && password === "Ajit@2929") {
            token = generateToken({ username, password });
            console.log(token);
            return res.status(200).json({ token, username, email: username + "@gmail.com", message: "success" })
        }
        else {
            return res.status(400).json({ message: "incorrect credential" });
        }
    } catch (error) {
        return res.send("error")
    }
}

export const get_products_controller = (req, res) => {
    try {
        const token = req.body?.token;
        if (!token) res.status(400).json({ message: "token not found" })
        const result = verifyToken(token);
        if (!result) return res.status(400).json({ message: "incorrect token" })
        const data = JSON.parse(fs.readFileSync("femaleBeautyProducts.json", "utf-8"));
        return res.status(200).json(data)
    } catch (error) {
        return res.status(400).json({ message: "Server Error" })
    }

}

export const get_manufacturers_details = (req, res) => {
    try {
        const token = req.body?.token;
        if (!token) return res.status(400).json({ message: "token not found" })
        const result = verifyToken(token);
        if (!result) return res.status(400).json({ message: "incorrect token" })
        const data = JSON.parse(fs.readFileSync("manufacturers.json", "utf-8"));
        return res.status(200).json(data)
    } catch (error) {
        return res.status(400).json({ message: "Server Error" })
    }
}

export const delete_products_controller = (req, res) => {
    try {
        const token = req.body?.token;
        let idToDelete = req.body?.item_id;
        if (!idToDelete) return res.status(400).json({ message: "no deleting item id is provided in body" })
        if (!token) return res.status(400).json({ message: "token not found" })
        const result = verifyToken(token);
        if (!result) return res.status(400).json({ message: "incorrect token" })
        idToDelete = Number(idToDelete)
        delete_product(idToDelete);
        const data = JSON.parse(fs.readFileSync("femaleBeautyProducts.json", "utf-8"));
        return res.status(200).json(data);

    } catch (error) {
        console.log("error", error)
        return res.send("server issue")
    }
}


export const delete_manufacturer_controller = (req, res) => {
    try {
        const token = req.body?.token;
        let idToDelete = req.body?.item_id;
        if (!idToDelete) return res.status(400).josn({ message: "no deleting item id is provided in body" })
        if (!token) return res.status(400).json({ message: "token not found" })
        const result = verifyToken(token);
        if (!result) return res.status(400).json({ message: "incorrect token" })
        delete_manufacturer(Number(idToDelete));
        const data = JSON.parse(fs.readFileSync("manufacturers.json", "utf-8"));
        return res.send(data);

    } catch (error) {
        console.log("error", error)
        return res.send("server issue")
    }
}

export const add_product_controller = (req, res) => {
    try {
        const token = req.body?.token;
        const product = req.body?.product;
        if (!product || Array.isArray(product) || typeof product !== "object") return res.status(400).json({ message: "adding product type must be an object" })
        if (!token) return res.status(400).json({ message: "token not found" })
        const result = verifyToken(token);
        if (!result) return res.status(400).json({ message: "incorrect token" })
        add_product(product, res);
        const data = JSON.parse(fs.readFileSync("femaleBeautyProducts.json","utf-8"))
        return res.status(200).json(data);

    } catch (error) {
        console.log("error", error);
        return res.send("server issue")
    }
}

export const get_deals_controller = (req, res) => {
    try {
        const token = req.body?.token;
        if (!token) return res.status(400).json({ message: "token not found" })
        const result = verifyToken(token);
        if (!result) return res.status(400).json({ message: "incorrect token" })

        return res.status(200).json(deals)
    } catch (error) {
        return res.status(400).json({ message: "Server Error" })
    }
}
