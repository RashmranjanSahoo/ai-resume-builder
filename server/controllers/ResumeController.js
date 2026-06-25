const fs = require("fs");
const { imagekit } = require("../config/imageKit");
const Resume = require("../models/resume");

const createResume = async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }
    const resume = await Resume.create({
      title,
      userId: req.userId,
    });
    return res.status(201).json({ resume });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteResume = async (req, res) => {
  try {
    const userId = req.userId;
    const { resumeId } = req.params;
    await Resume.findOneAndDelete({ userId, _id: resumeId });
    return res.status(200).json({ message: "Resume deleted Successfully" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const getResumeById = async (req, res) => {
  try {
    const userId = req.userId;
    const { resumeId } = req.params;
    const resume = await Resume.findOne({ userId, _id: resumeId });
    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }
    return res.status(200).json({ resume });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const getPublicResumeByid = async (req, res) => {
  try {
    const { resumeId } = req.params;
    const resume = await Resume.findOne({ public: true, _id: resumeId });
    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }
    return res.status(200).json({ resume });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const updateResume = async (req, res) => {
  try {
    const userId = req.userId;
    const { resumeId, resumeData, removeBackground } = req.body;
    const image = req.file;

    let resumeDataCopy = JSON.parse(resumeData);

    // ✅ CRITICAL FIX: Check if resumeDataCopy contains a nested resumeData
    // This means frontend sent the entire resume object instead of just content
    let actualResumeData = resumeDataCopy;
    
    if (resumeDataCopy.resumeData && typeof resumeDataCopy.resumeData === 'object') {
      // Frontend sent { _id, userId, title, ..., resumeData: {...} }
      // Extract the actual content from the nested resumeData
      actualResumeData = resumeDataCopy.resumeData;
    }

    // Extract top-level fields
    const { template, accent_color, public: isPublic, title } = resumeDataCopy;

    if (image) {
      const imageBufferData = fs.readFileSync(image.path);
      const shouldRemoveBg = removeBackground === "true";

      const response = await imagekit.upload({
        file: imageBufferData,
        fileName: image.originalname || "resume.png",
        folder: "user-resumes",
        transformation: {
          pre: "w-300,h-300,fo-face,z-0.75" + (shouldRemoveBg ? ",e-bgremove" : ""),
        },
      });

      fs.unlinkSync(image.path);

      actualResumeData.personal_info = actualResumeData.personal_info || {};
      actualResumeData.personal_info.image = response.url;
    }

    // Build update object
    const updateFields = {};
    if (template !== undefined) updateFields.template = template;
    if (accent_color !== undefined) updateFields.accent_color = accent_color;
    if (isPublic !== undefined) updateFields.public = isPublic;
    if (title !== undefined) updateFields.title = title;
    
    // ✅ IMPORTANT: Only update resumeData if it has actual content
    if (Object.keys(actualResumeData).length > 0) {
      updateFields.resumeData = actualResumeData;
    }

    const resume = await Resume.findOneAndUpdate(
      { userId, _id: resumeId },
      updateFields,
      { new: true }
    );

    return res.status(200).json({
      message: "saved successfully",
      resume,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
module.exports = {
  updateResume,
  getPublicResumeByid,
  createResume,
  deleteResume,
  getResumeById,
};