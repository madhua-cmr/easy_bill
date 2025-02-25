import express from "express";
import {
  addBill,
  addProduct,
  deleteBill,
  editBill,
  getBill,
  getBills,
  getProduct,
  getProductName,
} from "../controllers/bill.controller.js";
import { protectRoute } from "../middlewares/protectRoute.js";
import adminRoute from "../middlewares/adminRoute.js";

const router = express.Router();

router.get("/",protectRoute, getBills);
router.post("/",protectRoute,adminRoute, addBill);
router.delete("/:id",protectRoute,adminRoute, deleteBill);
router.put("/:id",protectRoute,adminRoute, editBill);
router.post("/add/product", protectRoute,adminRoute,addProduct);
router.get("/get/product", getProduct);
router.get("/product/:id", getProductName);
router.get("/bill/:id",protectRoute, getBill);
export default router;
