import express from "express"
import { isAutunticated } from "../middleware/auth.js";
import { cencelSubscrption, getRazorpayKey, paymentVerification, subscribe } from "../controller/paymentController.js";

const router=express.Router();

router.route("/subscribe").get(isAutunticated,subscribe)
router.route("/paymentverification").post(isAutunticated,paymentVerification)
router.route("/razorpaykey").get(getRazorpayKey)
router.route("/subscribe/cancel").delete(isAutunticated,cencelSubscrption)


export default router