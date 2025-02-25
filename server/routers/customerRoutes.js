import { addCustomer, deleteCustomer, getCustomerBalance, getCustomerBills, getCustomers } from "../controllers/customer.controller.js";
import express from "express"
import { protectRoute } from "../middlewares/protectRoute.js";
import adminRoute from "../middlewares/adminRoute.js";

const router=express.Router();
router.post("/:customerId",protectRoute,getCustomerBills);
router.get("/:customerId/balance",getCustomerBalance);
router.get("/",getCustomers);
router.delete("/:id",deleteCustomer);
router.post("/",protectRoute,adminRoute,addCustomer);


export default router;