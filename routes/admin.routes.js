import express from "express"
import { add_product_controller, delete_manufacturer_controller, delete_products_controller, get_manufacturers_details, get_products_controller, login_controller } from "../controllers/admin.controller.js";
const router = express.Router();

router.post("/log", login_controller);
router.patch("/get-products",get_products_controller);
router.patch("/get-manufacturers", get_manufacturers_details);
router.delete("/delete-product", delete_products_controller)
router.delete("/delete-manufacturer", delete_manufacturer_controller)
router.post("/add-product", add_product_controller)

export default router;