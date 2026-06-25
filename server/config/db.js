const mongoose = require("mongoose");
const dns = require("dns");

const connectDB = async () => {
    const mongodbURI = process.env.MONGODB_URI;
    const dbName = process.env.MONGODB_DB || "resume-builder";

    if (!mongodbURI) {
        throw new Error("MONGODB_URI environment variable not set");
    }

    mongoose.connection.on("connected", () => {
        console.log("Database connected");
    });

    if (mongodbURI.startsWith("mongodb+srv://")) {
        dns.setServers(["8.8.8.8", "1.1.1.1"]);
    }

    await mongoose.connect(mongodbURI, {
        dbName,
        serverSelectionTimeoutMS: 10000,
    });
};

module.exports = connectDB;
