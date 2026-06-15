const mongoose = require("mongoose");

const ResumeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      default: "Untitled Resume",
    },

    template: {
      type: String,
      default: "nit-trichy",
    },

    accent_color: {
      type: String,
      default: "#00050d",
    },

    public: {
      type: Boolean,
      default: false,
    },

    resumeData: {
      type: Object,
      default: {},
    },
  },
  {
    timestamps: true,
    minimize: false
  }
);

const Resume = mongoose.model("Resume", ResumeSchema);

module.exports = Resume;