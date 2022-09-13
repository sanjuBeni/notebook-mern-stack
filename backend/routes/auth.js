const express = require("express");
const router = express.Router();
const User = require("../mongoose_module/Users");
const { body, validationResult } = require("express-validator");

// Create a user using POST method --- End Point is --> /api/auth/createuser

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

    // If there are error return Bad request

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let userEmail = await User.findOne({ email: req.body.email });

      if (userEmail) {
        return res.status(400).json({ error: "Email alresy exists." });
      }

      let users = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });
      res.send(users);
    } catch (error) {
      res.status(500).json({ error: "Some error occured" });
    }
  }
);

module.exports = router;
