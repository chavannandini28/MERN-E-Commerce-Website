const asyncHandler = require("express-async-handler");
const crypto = require("crypto");

const User = require("../models/userModel");
const sendEmail = require("../utils/sendEmail");


// ======================================
// Register User
// ======================================
exports.register = asyncHandler(async (req, res) => {

  const {
    name,
    email,
    password,
    phone,
    role
  } = req.body;


  if (!name || !email || !password) {
    return res.status(400).json({
      success:false,
      message:"Name, Email and Password are required"
    });
  }


  const existingUser = await User.findOne({
    email
  });


  if(existingUser){
    return res.status(400).json({
      success:false,
      message:"User already exists"
    });
  }


  const user = await User.create({

    name,
    email,
    password,
    phone,

    // IMPORTANT
    role: role === "Admin" ? "Admin" : "Customer"

  });



  const token = user.generateToken();


  user.password = undefined;


  res.status(201).json({

    success:true,
    message:"Registration Successful",
    token,
    user

  });


});




// ======================================
// Login User
// ======================================
exports.login = asyncHandler(async(req,res)=>{


 const {
   email,
   password
 } = req.body;



 if(!email || !password){

   return res.status(400).json({

    success:false,
    message:"Email and Password are required"

   });

 }



 const user = await User
 .findOne({email})
 .select("+password");



 if(!user){

  return res.status(401).json({

    success:false,
    message:"Invalid Email or Password"

  });

 }




 const isMatch = await user.comparePassword(password);



 if(!isMatch){

   return res.status(401).json({

    success:false,
    message:"Invalid Email or Password"

   });

 }



 const token = user.generateToken();



 user.password = undefined;



 res.status(200).json({

    success:true,
    message:"Login Successful",
    token,
    user

 });


});




// ======================================
// Logout
// ======================================
exports.logout = asyncHandler(async(req,res)=>{

res.status(200).json({

 success:true,
 message:"Logout Successful"

});


});





// ======================================
// Get Profile
// ======================================
exports.getProfile = asyncHandler(async(req,res)=>{


const user = await User.findById(req.user.id);



if(!user){

return res.status(404).json({

 success:false,
 message:"User not found"

});


}



res.status(200).json({

 success:true,
 user

});


});






// ======================================
// Update Profile
// ======================================
exports.updateProfile = asyncHandler(async(req,res)=>{


const {
 name,
 phone
}=req.body;



const user = await User.findById(req.user.id);



if(!user){

return res.status(404).json({

success:false,
message:"User not found"

});

}



if(name)
user.name=name;


if(phone)
user.phone=phone;



await user.save();



res.status(200).json({

success:true,
message:"Profile Updated Successfully",
user

});


});






// ======================================
// Change Password
// ======================================
exports.changePassword = asyncHandler(async(req,res)=>{


const {
 currentPassword,
 newPassword
}=req.body;



const user = await User
.findById(req.user.id)
.select("+password");



const match =
await user.comparePassword(currentPassword);



if(!match){

return res.status(400).json({

success:false,
message:"Current password incorrect"

});

}



user.password=newPassword;


await user.save();



res.status(200).json({

success:true,
message:"Password Changed Successfully"

});


});






// ======================================
// Forgot Password
// ======================================
exports.forgotPassword = asyncHandler(async(req,res)=>{


const {email}=req.body;


const user = await User.findOne({
email
});


if(!user){

return res.status(404).json({

success:false,
message:"User not found"

});

}



const resetToken =
crypto.randomBytes(32).toString("hex");



user.resetPasswordToken =
crypto.createHash("sha256")
.update(resetToken)
.digest("hex");



user.resetPasswordExpire =
Date.now()+10*60*1000;



await user.save();



const resetURL =
`${process.env.CLIENT_URL}/reset-password/${resetToken}`;



const message = `
Reset Password Link:

${resetURL}

Expires in 10 minutes.
`;



await sendEmail(
user.email,
"Password Reset",
message
);



res.status(200).json({

success:true,
message:"Password Reset Email Sent"

});


});






// ======================================
// Reset Password
// ======================================
exports.resetPassword = asyncHandler(async(req,res)=>{


const token =
crypto.createHash("sha256")
.update(req.params.token)
.digest("hex");



const user = await User.findOne({

resetPasswordToken:token,

resetPasswordExpire:{
$gt:Date.now()
}

})
.select("+password");




if(!user){

return res.status(400).json({

success:false,
message:"Invalid or expired token"

});

}



user.password=req.body.password;


user.resetPasswordToken=undefined;

user.resetPasswordExpire=undefined;



await user.save();



res.status(200).json({

success:true,
message:"Password Reset Successful"

});


});






// ======================================
// OTP
// ======================================
exports.verifyOTP = asyncHandler(async(req,res)=>{

res.status(200).json({

success:true,
message:"OTP Verified Successfully"

});

});



exports.resendOTP = asyncHandler(async(req,res)=>{

res.status(200).json({

success:true,
message:"OTP Sent Successfully"

});

});