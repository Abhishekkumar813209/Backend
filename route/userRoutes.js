import express from "express";
import { register ,
    login,
    logout, 
    forgetPassword,
    resetPassword,
    getMyProfile, 
    changePassword, 
    updateProfile,
    updateprofilepicture,
    addToPlaylist,
    removeFromPlaylist,
    updateUserRole,
    getAllUsers,
    deleteUser,
    deleteMyProfile
}  from "../controllers/userController.js";
import singleUpload from "../middlewares/multer.js";
import { authorizeAdmin, isAuthenticated } from "../middlewares/auth.js";
const router =  express.Router();

//to register a new user
router.route("/register").post(singleUpload,register)

//login
router.route("/login").post(login)

//Logout 
router.route("/logout").get(logout)

//Get my profile
router.route("/me").get(isAuthenticated,getMyProfile)

//Delete My Profile 
router.route("/me").delete(isAuthenticated,deleteMyProfile)

//ChangePassword
router.route("/changepassword").put(isAuthenticated,changePassword);


//UpdatePassword
router.route("/updateprofile").put(isAuthenticated,singleUpload,updateProfile);


//UpdateProfilePicture
router.route("/updateprofilepicture").put(isAuthenticated,updateprofilepicture);

//ForgetPassword
router.route("/forgetpassword").post(forgetPassword);
//Reset Password
router.route("/resetpassword/:token").put(resetPassword);

//AddtoPlaylist
router.route("/addtoplaylist").post(isAuthenticated,addToPlaylist);

//RemoveFromPlaylist
router.route("/removefromplaylist").delete(isAuthenticated,removeFromPlaylist);


//Admin Routes
router.route("/admin/users").get(isAuthenticated,authorizeAdmin,getAllUsers)

router.route("/admin/user/:id")
.put(isAuthenticated,authorizeAdmin,updateUserRole)
.delete(isAuthenticated,authorizeAdmin,deleteUser)


export default router;