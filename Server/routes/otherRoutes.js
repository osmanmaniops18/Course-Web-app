import express from "express"
import { isAuthirizeAdmin, isAutunticated } from "../middleware/auth.js";
import { adminStats, contact, courseRequest } from "../controller/otherController.js";


const router=express.Router();


router.route("/contact").post(contact)
router.route("/courserequest").post(courseRequest)
router.route("/admin/stats").get(isAutunticated,isAuthirizeAdmin,adminStats)

export default router