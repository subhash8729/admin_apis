import express from "express"
import { add_deals_controller, add_product_controller, add_report, delete_deal_controller, delete_manufacturer_controller, delete_products_controller, delete_report_controller, get_deals_controller, get_manufacturers_details, get_products_controller, get_reports_controller, login_controller, update_report } from "../controllers/admin.controller.js";
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

router.get("/get-reports", verifyJWT, get_reports_controller);
router.post("/add-report", verifyJWT, add_report);
router.delete("/delete-report/:id", verifyJWT, delete_report_controller);
router.patch("/update-report", verifyJWT, update_report);
export default router;