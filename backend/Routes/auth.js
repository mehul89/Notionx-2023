const express = require("express");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
var fetchuser = require("../middleware/fetchuser");
const router = express.Router();

const JWT_SECRET = "mehulisagoodboy";

// ROUTE:1 create user using POST API= "https://notionx-api.onrender.com/api/auth/createuser"  dosen't require auth
router.post(
  "/createuser",
  [
    body("name", "Enter valid name").isLength({ min: 3 }),
    body("email", "Enter Valid email").isEmail(),
    body("password", "Enter Password must be atlist 5 charaters").isLength({min: 5}),
  ],
  async (req, res) => {
    let success = false;
    //if thareare error returen bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }

    //check whether the user with this email exist already
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ success , error: "Sorry this email already exists" });
      }

      const salt = await bcrypt.genSalt(10);
      const secpass = await bcrypt.hash(req.body.password, salt);

      // create user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secpass,
      });

      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success , authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some Error occurred");
    }
  }
);

// ROUTE:2 Authenticate a user using POST API= "https://notionx-api.onrender.com/api/auth/login"

router.post(
  "/login",
  [
    body("email", "Enter Valid email").isEmail(),
    body("password", "Password cannot blank ").exists(),
  ],
  async (req, res) => {
    //if thareare error returen bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ errors: "Please try to login with correct credentials" });
      }

      const data = {
        user: {
          id: user.id,
        },
      };

      const passcompare = await bcrypt.compare(password, user.password);
      if (!passcompare) {
        return res
          .status(400)
          .json({ errors: "Please try to login with correct credentials" });
      }

      const authtoken = jwt.sign(data, JWT_SECRET);
      res.json({ authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server Error occurred");
    }
  }
);

// ROUTE:3 Get user data using POST API= "https://notionx-api.onrender.com/api/auth/getuser"

router.post("/getuser", fetchuser, async (req, res) => {
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
