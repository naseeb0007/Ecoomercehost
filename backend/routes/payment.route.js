import express from "express";
import { createCheckoutSession, checkoutSuccess } from "../controllers/payment.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js"; // If you have auth middleware

const router = express.Router();

router.post("/create-checkout-session", protectRoute, createCheckoutSession); // Protect route if needed
router.post("/checkout-success", protectRoute, checkoutSuccess);

export default router;
