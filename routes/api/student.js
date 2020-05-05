const express=require("express");
const router=express.Router();
const auth=require("../../middleware/auth");
const User=require("../../model/User");
const Class=require("../../model/class");
const Student=require("../../model/students");
const { successResponse,
    unauthorized,
    serverError,
    notFound }=require("../../helpers/response");

const asyncHandler=require("../../helpers/async");    


  //create student record
  router.post("/:id",auth,asyncHandler(async(req,res)=>{
    const newclass=await Class.findById(req.params.id);

    if(!newclass)
    {
        return notFound(res,"Class Not found")
    };

    const {name,enroll}=req.body;
    const user= await User.findById(req.user.id).select("-password");
  //   const oldclass= await Class.findById(req.params.id).select("-password");
    const student=new Student({
        name,
        enroll,    
        // userId:req.user.id,
        subject:newclass.subject,
        semester:newclass.semester,
        branch:user.branch,
        classId:req.params.id
    });

   await student.save();
   successResponse(res,student,"Students are successfully registered ");

}));


//get all students record
router.get("/",auth,asyncHandler(async(req,res)=>{
 
  const student = await Student.find().lean().sort({ date: -1 });

    if(!student)
    {
       return notFound(res," Students not found"); 
    }
    successResponse(res,student,"students record...");

}));



//get student from specific class
router.get("/:id",auth,asyncHandler(async(req,res)=>{
 
  const student = await Student.find({classId:req.params.id}).lean();

    if(!student)
    {
       return notFound(res," Students not found"); 
    }
    successResponse(res,student,"students record...");

}));



//delete a student
router.delete("/:id",auth,asyncHandler(async(req,res)=>{
const student= await Student.findById(req.params.id);
// const newclass=await Class.findById(req.params.id);  
if(!student)
{
    return notFound(res,"student not found");
}

await Student.deleteOne({_id:req.params.id});
successResponse(res," student deleted successfilly"); 

}));

module.exports= router;