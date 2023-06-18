import express from "express";

import { authorizeAdmin, isAuthenticated } from "../middlewares/auth.js";
import { getDashboardStats,contact,courseRequest} from "../controllers/otherController.js";

const router = express.Router();

//contact form 
router.route("/contact").post(contact);

// Request from 
router.route("/courserequest").post(courseRequest);

//Get Admin Dashboard stats 
router.route("/admin/stats").get(isAuthenticated,authorizeAdmin,getDashboardStats)

export default router;