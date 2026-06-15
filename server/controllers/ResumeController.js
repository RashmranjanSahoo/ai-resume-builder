// controller for creating a new resume
//  Post: /api/resumes/create

const { imagekit } = require("../config/imageKit");
const Resume = require("../models/resume");
const { clientEncryption } = require("../models/User");
const fs = require("fs");

const createResume = async (req, res) => {
  try {
    const userId = req.userId;
    const { title } = req.body;

    // create new resume
    const newResume = await Resume.create({
      userId,
      title,
    });

    // return success message
    return res.status(201).json({
      message: "Resume created Successfully",
      resume: newResume,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

// controller for deleting a resume
// delete": /api/resumes/delete
const deleteResume = async (req, res) => {
  try {
    const userId = req.userId;
    const { resumeId } = req.params;

    await Resume.findOneAndDelete({
      userId,
      _id: resumeId,
    });
    // return success message
    return res.status(200).json({
      message: "Resume deleted Successfully",
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

// get user resume by _id
// GET: /api/resume/get

const getResumeById = async (req, res) => {
  try {
    const userId = req.userId;
    const { resumeId } = req.params;

    const resume = await Resume.findOne({
      userId,
      _id: resumeId,
    });

    if (!resume) {
      return res.status(404).json({
        message: "Resume not found",
      });
    }

    const resumeData = resume.toObject();

    delete resumeData.__v;
    delete resumeData.createdAt;
    delete resumeData.updatedAt;

    return res.status(200).json({
      resume: resumeData,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

// get resume by id public
// GET: /api/resume/public

const getPublicResumeByid = async (req, res) => {
  try {
    const { resumeId } = req.params;
    const resume = await Resume.findOne({
      public: true,
      _id: resumeId,
    });

    if (!resume) {
      return res.status(404).json({
        message: "Resume not found",
      });
    }

    return res.status(200).json({
      resume,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

// update resume by _id
// PUT:/api/resumes/updates

const updateResume = async (req, res) => {
  try {
    const userId = req.userId;
    const { resumeId, resumeData, removeBackground } = req.body;
    const image = req.file;

    let resumeDataCopy = JSON.parse(resumeData);
    if (image) {
      const imageBufferData = fs.createReadStream(image.path);
      const response = await imagekit.files.upload({
        file: imageBufferData,
        fileName: "resume.png",
        folder: "user-resumes",
        transformation: {
          pre:
            "w-300,h-300,fo-face,z-0.75" +
            (removeBackground ? ",e-bgremove" : ""),
        },
      });
      resumeDataCopy.personal_info = resumeDataCopy.personal_info || {};
      resumeDataCopy.personal_info.image = response.url;
    }

    const resume = await Resume.findOneAndUpdate(
      {
        userId,
        _id: resumeId,
      },
      resumeData = resumeDataCopy,
      { new: true },
    );

    return res.status(200).json({
      message: "saved successfully",
      resume,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

module.exports={
    updateResume,
    getPublicResumeByid,
    createResume,
    deleteResume,
    getResumeById
}
