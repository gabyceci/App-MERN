import express from "express";

const router = express.Router()

// /api/registerClients
router.route("/").post()

// /api/registerClients/verifyCodeEmail
router.route("/verifyCodeEmail").post()

export default router