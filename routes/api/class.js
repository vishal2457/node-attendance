const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const User = require("../../model/User");
const Class = require("../../model/class");
const Student = require("../../model/students");
const {
  successResponse,
  unauthorized,
  serverError,
  notFound,
} = require("../../helpers/response");
const asyncHandler = require("../../helpers/async");

//Create new class
router.post(
  "/",
  auth,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id).select("-password");
    const { semester, subject } = req.body;
    const newclass = new Class({
      semester,
      subject,
      teacher: user.name,
      branch: user.branch,
      date: Date.now(),
      userId: req.user.id,
    });

    await newclass.save(async (err) => {
      if (err) {
        return res.send(err);
      }
      successResponse(res, newclass, "All class");
    });
  })
);


router.get("/",auth,asyncHandler(async(req,res)=>{
    const newclass= await Class.find().lean();
  // const student = await Student.find({classId:req.params.id}).lean();

    if(!newclass)
    {
        return notFound(res,"Class Not found")
    };

    // if(!student)
    // {
    //    return notFound(res," Students not found"); 
    // }
    successResponse(res,newclass,"All class...");

}));


//delete a class
router.delete(
  "/:id",
  auth,
  asyncHandler(async (req, res) => {
    const newclass = await Class.findById(req.params.id);

    if (!newclass) {
      return notFound(res, "Class not found");
    }

    if (newclass.userId != req.user.id) {
      return unauthorized(
        res,
        "You are not authorized person to perform this action.."
      );
    }

    await Class.deleteOne({ _id: req.params.id });
    successResponse(res, " Class deleted successfilly");
  })
);

module.exports = router;
