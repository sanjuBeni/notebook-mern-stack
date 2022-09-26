const express = require("express");
const router = express.Router();
const User = require("../mongoose_module/Users");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchUser = require("../middleware/fetchUser");

const JWT_SECRET = "notebook@website";

// Route: 1 -> Create a user using POST method --- End Point is --> /api/auth/createuser

router.post(
  "/createuser",
  [
    body("name", "Enter a valid name.").isLength({ min: 3 }),
    body("email", "Enter a valid email.").isEmail(),
    body("password", "Password must be atleast 5 character.").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    let success = false;
    // If there are error return Bad request

    if (!errors.isEmpty()) {
      return res.status(400).json({ success: success, errors: errors.array() });
    }

    try {
      let userEmail = await User.findOne({ email: req.body.email });

      if (userEmail) {
        return res
          .status(400)
          .json({ success: success, error: "Email alresy exists." });
      }
      const salt = await bcrypt.genSalt(10);
      let newPass = await bcrypt.hash(req.body.password, salt);
      let users = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: newPass,
      });

      const data = {
        user: {
          id: users.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success: success, authToken: authToken });
    } catch (error) {
      res.status(500).json({ error: "Internal server error." });
    }
  }
);

// Route: 2 -> Authenticate a user using method POST "api/auth/login"

router.post(
  "/login",
  [
    body("email", "Enter a valid email.").isEmail(),
    body("password", "Password can not be blank.").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    let success = false;

    if (!errors.isEmpty()) {
      return res.status(400).json({ success: success, errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      // if email and password not match gien error

      if (!user) {
        return res.status(400).json({
          success: success,
          error: "Sorry! fill the valid credentials.",
        });
      }

      let passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res.status(400).json({
          success: success,
          error: "Sorry! fill the valid credentials.",
        });
      }

      // if email and password match send user id

      let payLoadData = {
        user: {
          id: user.id,
        },
      };

      let authToken = jwt.sign(payLoadData, JWT_SECRET);
      success = true;
      res.json({ success: success, authToken: authToken });
    } catch (error) {
      res.status(500).json({ error: "Internal server error." });
    }
  }
);

// Route 3 : Get user details with POST method

router.post("/getuser", fetchUser, async (req, res) => {
  try {
    let userId = req.user.id;
    const userData = await User.findById(userId).select("-password");
    res.json(userData);
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
});

module.exports = router;
