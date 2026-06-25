const express = require("express");
const protect = require("../middlewares/auth");
const { createResume, updateResume, deleteResume, getPublicResumeByid, getResumeById } = require("../controllers/ResumeController");
const upload = require("../config/multer");
// ❌ remove this - multer is already configured in ../config/multer
// const multer = require("multer"); 
const resumeRouter = express.Router();

resumeRouter.post('/create', protect, createResume);
resumeRouter.put('/update', protect, upload.single('image'), updateResume);  // ✅ fixed
resumeRouter.delete('/delete/:resumeId', protect, deleteResume);
resumeRouter.get('/get/:resumeId', protect, getResumeById);
resumeRouter.get('/public/:resumeId', getPublicResumeByid);

module.exports = resumeRouter;