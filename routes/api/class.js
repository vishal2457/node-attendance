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
    });
    successResponse(res, newclass, "New class created successfully");
  })
);

//get all class created by teachers
router.get(
  "/",
  auth,
  asyncHandler(async (req, res) => {
    const newclass = await Class.find().lean().sort({ date: -1 });
    if (!newclass) {
      return notFound(res, "Clubs not found");
    }
    successResponse(res, newclass, "All class");
  })
);

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
        "You are noy authorized person to perform this action.."
      );
    }

    await Class.deleteOne({ _id: req.params.id });
    successResponse(res, " Class deleted successfilly");
  })
);

//create student record
router.post(
  "/addstudents/:id",
  auth,
  asyncHandler(async (req, res) => {
    const newclass = await Class.findById(req.params.id);

    await newclass.save(async (err) => {
      if (err) {
        return res.send(err);
      }
    });
    successResponse(res, newclass, "New class created successfully");
  })
);

//create student record
router.post(
  "/addstudents/:id",
  auth,
  asyncHandler(async (req, res) => {
    const newclass = await Class.findById(req.params.id);
    if (!newclass) {
      return notFound(res, "Class Not found");
    }
    const { name, className } = req.body;
    const student = new Student({
      name,
      className,
      classId: req.params.id,
    });

    await student.save();
    successResponse(res, student, "Student successfully registered ");
  })
);

//get all students record
router.get(
  "/getstudents",
  auth,
  asyncHandler(async (req, res) => {
    //   const newclass= await Class.findById(req.params.id);
    const student = await Student.find().lean().sort({ date: -1 });

    //   if(!newclass)
    //   {
    //       return notFound(res,"Class Not found")
    //   };

    if (!student) {
      return notFound(res, " Students not found");
    }
    successResponse(res, student, "students record...");
  })
);

//delete student record
router.delete(
  "/student/:id",
  auth,
  asyncHandler(async (req, res) => {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return notFound(res, "student not found");
    }

    await Student.deleteOne({ _id: req.params.id });
    successResponse(res, " student deleted successfilly");
  })
);

module.exports = router;
