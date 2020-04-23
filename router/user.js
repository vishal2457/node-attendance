const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const User = require("../model/user");

//@route         POST api/users
//@description   register user
//@access        public
router.post(
  "/",
  [
    check("name", "Please enter a Name").not().isEmpty(),
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Password should have atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    try {
      const { name, email, password, college, branch } = req.body;
      let user = await User.findOne({
        email,
      });
      if (user) {
        return other(res, "Email already exists, Please login");
      }
      user = new User({
        name,
        email,
        password,
        college,
        branch,
        date: Date.now(),
      });

      //encrypt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      //return jasonwebtoken
      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        {
          expiresIn: 3600000,
        },
        (err, token) => {
          if (err) throw err;

          successResponse(res, token, "user registered successfully");
        }
      );
    } catch (err) {
      console.error(err.message);
      return res.status(500).send({ error: err, msg: "server error" });
    }
  }
);
