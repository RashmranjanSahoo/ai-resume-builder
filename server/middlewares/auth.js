const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log("AUTH HEADER:", authHeader); // ← add this

    if (!authHeader) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];
    console.log("TOKEN:", token); // ← add this

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("DECODED:", decoded); // ← add this
        
        req.userId = decoded.id;
        console.log("USER ID:", req.userId); // ← add this
        next();

    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }
};

module.exports = protect;