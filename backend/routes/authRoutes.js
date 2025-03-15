const express = require('express');
const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const {
     registerUser,
     loginUser,
     getUserInfo,
} = require("../controllers/authController");

const router = express.Router();

// Use upload middleware for the register route
router.post("/register"  , registerUser);
router.post("/login", loginUser);
router.get("/getUser", protect, getUserInfo);

// Separate route for testing image upload
router.post("/upload-image", upload.single('image'), (req, res) => {
     if (!req.file) {
           return res.status(400).json({ message: "Please upload a file" });
     }
     const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
     res.status(200).json({ imageUrl });
});

module.exports = router;