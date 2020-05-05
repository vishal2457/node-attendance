const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const User = require("../../model/User");

const Class = require("../../model/class");
const Student = require("../../model/students");
const Attendance = require("../../model/attendance");
const {
  successResponse,
  unauthorized,
  serverError,
  notFound,
} = require("../../helpers/response");
const asyncHandler = require("../../helpers/async");

//new attendance
router.post(
  "/new/:id",
  auth,
  asyncHandler(async (req, res) => {
    const student = await Student({ classId: req.params.id }).lean();
    var presentArr = [];
    var absentArr = [];
    for (let singleStudent of student) {
      singleStudent.isPresent = req.body.isPresent;
      if (singleStudent.isPresent) {
        newStudent = {
          student: singleStudent._id,
          name: singleStudent.name,
        };
        presentArr.push(newStudent);
      } else if (!singleStudent.isPresent) {
        newStudent = {
          student: singleStudent._id,
          name: singleStudent.name,
        };
        absentArr.push(newStudent);
      }
    }
    const newAtt = new Attendance({
      date: Date.now(),
      present: presentArr,
      absent: absentArr,
    });
    await newAtt.save();
    successResponse(res, newAtt, "New attendance registered successfully");
  })
);

module.exports = router;
