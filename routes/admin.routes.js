import express from "express"
import { add_deals_controller, add_product_controller, delete_deal_controller, delete_manufacturer_controller, delete_products_controller, get_deals_controller, get_manufacturers_details, get_products_controller, login_controller } from "../controllers/admin.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js"
import { sendHtml } from "../home.js";
const router = express.Router()
router.get("/",sendHtml)
router.post("/login", login_controller)
router.get("/get-products", verifyJWT, get_products_controller)


router.get("/get-manufacturers",verifyJWT, get_manufacturers_details)
router.post("/add-product", verifyJWT, add_product_controller)
router.delete("/delete-product", verifyJWT, delete_products_controller)
router.delete("/delete-manufacturer", verifyJWT, delete_manufacturer_controller)
router.post("/add-product", verifyJWT, add_product_controller)
router.get("/get-deals", verifyJWT, get_deals_controller)
router.post("/add-deal", verifyJWT, add_deals_controller)
router.delete("/delete-deal", verifyJWT, delete_deal_controller)
//comment to start redeploy on vercel
export default router;