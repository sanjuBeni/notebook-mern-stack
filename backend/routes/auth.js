const express = require("express");
const router = express.Router();
const User = require("../mongoose_module/Users");
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'notebook@website';

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

    // If there are error return Bad request

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const salt = await bcrypt.genSalt(10);
      let newPass = await bcrypt.hash(req.body.password, salt);
      let userEmail = await User.findOne({ email: req.body.email });

      if (userEmail) {
        return res.status(400).json({ error: "Email alresy exists." });
      }

      let users = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: newPass,
      });

      const data = {
        user:{
          id:users.id,
        }
      }

      const authToken = jwt.sign(data, JWT_SECRET);
      // console.log(jwtData);

      res.send({authToken});
    } catch (error) {
      res.status(500).json({ error: "Some error occured" });
    }
  }
);

module.exports = router;
