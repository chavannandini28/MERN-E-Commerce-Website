const express = require("express");

const router = express.Router();


const {

register,
login,
logout,
getProfile,
updateProfile,
changePassword,
forgotPassword,
resetPassword,
verifyOTP,
resendOTP

}=require("../controllers/authController");



const {
protect
}=require("../middleware/authMiddleware");


const authorize =
require("../middleware/roleMiddleware");




// PUBLIC

router.post(
"/register",
register
);


router.post(
"/login",
login
);


router.post(
"/logout",
logout
);



router.post(
"/forgot-password",
forgotPassword
);



router.post(
"/reset-password/:token",
resetPassword
);



router.post(
"/verify-otp",
verifyOTP
);



router.post(
"/resend-otp",
resendOTP
);





// PRIVATE


router.get(
"/profile",
protect,
getProfile
);



router.put(
"/profile",
protect,
updateProfile
);



router.put(
"/change-password",
protect,
changePassword
);





// ADMIN TEST


router.get(
"/admin",
protect,
authorize("Admin"),
(req,res)=>{

res.json({

success:true,
message:"Welcome Admin"

});


});



module.exports = router;