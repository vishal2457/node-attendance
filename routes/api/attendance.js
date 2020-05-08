const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
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
  "/new/:classId",
  auth,
  asyncHandler(async (req, res) => {
    const student = await Student({ classId: req.params.classId }).lean();
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
    var percent;
    if (presentArr.length > 0) {
      percent = (presentArr.length * 100) / student.length;
    } else {
      percent = 0;
    }
    const newAtt = new Attendance({
      date: Date.now(),
      percent: percent,
      present: presentArr,
      absent: absentArr,
      classId: req.params.id,
    });

    await newAtt.save();
    successResponse(res, newAtt, "New attendance registered successfully");
  })
);

//get all attendance in a class
router.get(
  "/allAtt/:classId",
  auth,
  asyncHandler(async (req, res) => {
    const allAtt = await Attendance.find({ classId: req.params.id })
      .lean()
      .sort({ date: -1 });
    if (!allAtt) {
      return notFound(res, "No attendance to show");
    }
    successResponse(res, allAtt, "All attendance from a single class");
  })
);

//count each students attendance percentage in class (try to implement this)

module.exports = router;
