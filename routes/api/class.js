const express=require("express");
const router=express.Router();
const auth=require("../../middleware/auth");
const User=require("../../model/User");
const Class=require("../../model/class");
const Student=require("../../model/students")
const{  successResponse,
    unauthorized,
    serverError,
    notFound
}=require("../../helpers/response");
const asyncHandler=require("../../helpers/async"); 


//Create new class
router.post(
    "/",
    auth,
    asyncHandler(async (req, res) => {
        const user= await User.findById(req.user.id).select("-password");
      const {semester,subject} = req.body;
      const newclass = new Class({
        semester,
        subject,
        branch:user.branch,
        date: Date.now(),
        userId: req.user.id,
      });
      
      await newclass.save(async(err)=>{
        if(err)
        {
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
 router.delete("/:id",auth,asyncHandler(async(req,res)=>{
     const newclass= await Class.findById(req.params.id);

     if(!newclass)
     {
         return notFound(res,"Class not found");
     }

     await Class.deleteOne({_id:req.params.id});
     successResponse(res," Class deleted successfilly"); 
    
 }));



  //create student record
  router.post("/addstudents/:id",auth,asyncHandler(async(req,res)=>{
      const newclass=await Class.findById(req.params.id);

      if(!newclass)
      {
          return notFound(res,"Class Not found")
      };

      const {name}=req.body;
      const user= await User.findById(req.user.id).select("-password");
    //   const oldclass= await Class.findById(req.params.id).select("-password");
      const student=new Student({
          name,
          semester:newclass.semester,
          branch:user.branch,
          classId:req.params.id
      });
 
     await student.save();
     successResponse(res,student,"Students are successfully registered ");

  }));


  module.exports=router;