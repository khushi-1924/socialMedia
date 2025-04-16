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
        },
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
    const user = await User.findById(userId)
      .select("-password")
      .populate("followers", "name profilePic") // populate with selected fields
      .populate("following", "name profilePic");
    // Check if user and profilePic exist
    if (user && user.profilePic && user.profilePic.data) {
      // Convert profilePic buffer to base64
      const base64ProfilePic = `data:${
        user.profilePic.contentType
      };base64,${user.profilePic.data.toString("base64")}`;

      // Attach the base64 string to the user object
      user._doc.profilePic = base64ProfilePic;
    }

    const { font, backgroundColor, text } = user;
    user._doc.preferences = { font, backgroundColor, text };

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

// Route 6: to follow a user using: PUT '/api/auth/follow/:id'
router.put("/follow/:id", fetchUser, async (req, res) => {
  try {
    const targetUser = await User.findById(req.params.id);
    const currentUser = await User.findById(req.user.id);

    if (!targetUser || !currentUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // Prevent double follow
    if (!targetUser.followers.includes(currentUser._id)) {
      targetUser.followers.push(currentUser._id);
      currentUser.following.push(targetUser._id);

      await targetUser.save();
      await currentUser.save();

      return res.status(200).json({ success: "User followed!" });
    } else {
      return res.status(400).json({ error: "Already following user" });
    }
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Route 7: to unfollow a user using: PUT '/api/auth/unfollow/:id'
router.put("/unfollow/:id", fetchUser, async (req, res) => {
  try {
    const targetUser = await User.findById(req.params.id);
    const currentUser = await User.findById(req.user.id);

    if (!targetUser || !currentUser) {
      return res.status(404).json({ error: "User not found" });
    }

    targetUser.followers = targetUser.followers.filter(
      (id) => id.toString() !== currentUser._id.toString()
    );
    currentUser.following = currentUser.following.filter(
      (id) => id.toString() !== targetUser._id.toString()
    );

    await targetUser.save();
    await currentUser.save();

    return res.status(200).json({ success: "User unfollowed!" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Route 8: to search users using: GET '/api/auth/searchUsers'
router.get("/searchUsers", async (req, res) => {
  const query = req.query.query;
  try {
    const users = await User.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { username: { $regex: query, $options: "i" } },
      ],
    })
      .select("-password")
      .lean()
      .limit(10); // Limit to 10 results

    const formattedUsers = users.map((user) => {
      let profilePic = null;
      if (user.profilePic && user.profilePic.data) {
        profilePic = user?.profilePic?.data
          ? `data:${
              user.profilePic.contentType
            };base64,${user.profilePic.data.toString("base64")}`
          : `http://localhost:3000/static/user.png`;
      }
      return {
        _id: user._id,
        username: user.username,
        profilePic: profilePic,
        backgroundColor: user.backgroundColor || "#000000",
        font: user.font || "sans-serif",
        text: user.text || "Hello there!",
        followers: user.followers || [],
        following: user.following || [],
      };
    });

    res.status(200).json({ users: formattedUsers });
  } catch (error) {
    console.log("search error: ", error.message);
    res.status(500).json({ error: "internal server error" });
  }
});

module.exports = router;
