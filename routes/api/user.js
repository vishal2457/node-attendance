const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const User = require("../../model/User");
const {
  successResponse,
  unauthorized,
  notFound,
  other,
} = require("../../helpers/response");
const asyncHandler = require("../../helpers/async");
const auth = require("../../middleware/auth");

//@route         POST 
//@description   register user
//@access        public
router.post("/", async (req, res) => {
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
});


//get all teachers(users)
//@route Get

router.get("/",asyncHandler(async (req, res) => {
    const users = await User.find().lean();
       if (!users) {
      return notFound(res, "No user found");
    }
    successResponse(res, users, "this are the users");
  })
);


//@route         GET api/user/me
//@description   get current user
//@access        private
router.get(
  "/me",
  auth,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id).lean().select("-password")

    if (!user) {
      return notFound(res, "User not found");
    }
 
    
    // if(newclass.userId = req.user.id)
    // {
    //     return unauthorized(res,"You are not authorized person to perform this action..");
    // }

    const classes = await Class.find({ userId : req.user.id }).lean();

    const data = {
      user,
      classes,
    };
    successResponse(res, data, "Logged in users profile");
  })
);
module.exports = router;
