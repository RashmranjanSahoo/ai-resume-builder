const express= require("express");
const protect = require("../middlewares/auth");
const { createResume, updateResume, deleteResume, getPublicResumeByid, getResumeById } = require("../controllers/ResumeController");
const upload = require("../config/multer");

const resumeRouter = express.Router();

resumeRouter.post('/create',protect, createResume);
resumeRouter.put('/update',upload.single('image'), protect, updateResume);
resumeRouter.delete('/delete/:resumeId',protect, deleteResume);
resumeRouter.get('/get/:resumeId',protect, getResumeById );
resumeRouter.get('/public/:resumeId', getPublicResumeByid);

module.exports= resumeRouter;

