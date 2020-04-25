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
      const { className,subject} = req.body;
      const newclass = new Class({
        className,
        subject,
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
  

  //create student record
  router.post("addstudents/:id",auth,asyncHandler(async(req,res)=>{
      const newclass=await Class.findById(req.params.id);

      if(!newclass)
      {
          return notFound(res,"Class Not found")
      };

      const {name,className}=req.body;
 
      const student=new Student({
          name,
          className,
      });
 
     await student.save();
     successResponse(res,student,"Students are successfully registered ");

  }));


  module.exports=router;