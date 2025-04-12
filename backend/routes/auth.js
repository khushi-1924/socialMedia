const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "pictaisbest";
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const { upload } = require("../middleware/multerMiddleware");
const fetchUser = require("../middleware/fetchUser");
const fs = require("fs");
const path = require("path");

// Route 1: create a user using: POST '/api/auth/createUser'
router.post(
  "/createUser",
  [
    body("email", "inavlid email").isEmail(),
    body("password", "password length should be atleast 5").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let success = false;
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        success = false;
        return res
          .status(400)
          .json({ success, message: "user with this email already exists" });
      }

      const defaultProfilePicPath = path.resolve(
        __dirname,
        "../../src/assets/user.png"
      );
      const defaultProfilePic = fs.readFileSync(defaultProfilePicPath);

      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        username: req.body.username,
        password: secPass,
        profilePicture: {
            data: defaultProfilePic,
            contentType: "image/*",
        }
      });
      const data = {
        user: {
          id: user.id,
        },
      };

      const authToken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({
        success,
        authToken,
        user,
        message: "user created successfully",
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Internal server error");
    }
  }
);

// Route 2: login a user using: POST '/api/auth/loginUser'
router.post(
  "/loginUser",
  [
    body("emailORusername", "please enter username or email").exists(),
    body("password", "please enter password").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let success = false;
    const { emailORusername, password } = req.body;
    try {
      let user = await User.findOne({
        $or: [{ email: emailORusername }, { username: emailORusername }],
      });
      if (!user) {
        success = false;
        return res
          .status(400)
          .json({ success, message: "user does not exist" });
      }
      const passCompare = await bcrypt.compare(password, user.password);
      if (!passCompare) {
        success = false;
        return res.status(400).json({ success, message: "incorrect password" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      success = true;
      return res
        .status(200)
        .json({ success, authToken, user, message: "login successful" });
    } catch (err) {
      console.log(err.message);
      return res.status(500).send("internal server error");
    }
  }
);

// Route 3: Get logged-in user details using: GET '/api/auth/getUser'
router.get("/getUser", fetchUser, async (req, res) => {
    try {
      const userId = req.user.id;
      const user = await User.findById(userId).select("-password");
  
      // Check if user and profilePic exist
      if (user && user.profilePic && user.profilePic.data) {
        // Convert profilePic buffer to base64
        const base64ProfilePic = `data:${user.profilePic.contentType};base64,${user.profilePic.data.toString(
          "base64"
        )}`;
  
        // Attach the base64 string to the user object
        user._doc.profilePic = base64ProfilePic;
      }
  
      res.status(200).json({ user });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  });
  
// Route 4: to Upload/Update Profile Picture using: PUT '/api/auth/updateProfilePic'
router.put(
  "/updateProfilePic",
  fetchUser,
  upload.single("profilePic"),
  async (req, res) => {
    try {
      const userId = req.user.id;
      let profilePic = {};

      if (req.file) {
        // Read file and convert to Buffer
        const imgData = fs.readFileSync(req.file.path);
        profilePic = {
          data: imgData,
          contentType: req.file.mimetype,
        };
      }

      // Update user's profilePic if provided
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { profilePic: req.file ? profilePic : undefined }, // Only update if file exists
        { new: true }
      );

      // Delete temp file after upload
      if (req.file) {
        fs.unlink(req.file.path, (err) => {
          if (err) console.error("Error deleting temp file:", err);
        });
      }

      res.json({
        success: true,
        message: "Profile picture updated successfully",
        user: updatedUser,
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Error updating profile picture");
    }
  }
);

// Route 5: to store the user preferences for their card page using: PUT '/api/auth/updatePreferences'
router.put("/updatePreferences", fetchUser, async (req, res) => {
  const { font, backgroundColor, text } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { font, backgroundColor, text },
      { new: true }
    );
    res.status(200).json({ user: updatedUser });
  } catch (error) {
    console.error("Error updating preferences:", error);
    res.status(500).json({ error: "Failed to update preferences" });
  }
});

module.exports = router;
