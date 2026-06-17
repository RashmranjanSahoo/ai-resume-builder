const express = require("express");
const router = express.Router();

const protect = require("../middlewares/auth");
const { enhanceContent } = require("../controllers/aiController");

// AI enhance resume content
router.post("/enhance", protect, enhanceContent);

module.exports = router;