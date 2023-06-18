import express from "express";
import {isAuthenticated} from "../middlewares/auth.js";
import { buySubscription, cancelSubscription, getRazorPayKey } from "../controllers/paymentController.js";

const router = express.Router();

//Buy Subscription 
router.route("/subscribe").get(isAuthenticated , buySubscription)


//verify Payment and save reference in database
router.route("/paymentverification").post(isAuthenticated,buySubscription)

//Get Razorpay key
router.route("/razorpaykey").get(getRazorPayKey);

//Cancel Subscription 
router.route("/subscribe/cancel").delete(isAuthenticated,cancelSubscription)


export default router;