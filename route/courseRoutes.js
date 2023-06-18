import express from "express";
import { createCourse, getAllCourse,getCourseLectures , addLecture, deleteCourse, deleteLecture } from "../controllers/courseController.js";
import singleUpload from "../middlewares/multer.js";
import { isAuthenticated } from "../middlewares/auth.js";
import { authorizeAdmin ,authorizeSubscribers } from "../middlewares/auth.js";
const router = express.Router();

//Get all courses without lectures
router.route("/courses").get(getAllCourse);

//create new course only admin
router.route("/createcourse").post(isAuthenticated,authorizeAdmin , singleUpload ,createCourse);

//Add lectures , Delete Lectures , Get COurse details 

router
   .route("/course/:id")
   .get(isAuthenticated,authorizeSubscribers,getCourseLectures)
   .post(isAuthenticated,authorizeAdmin,singleUpload,addLecture)
   .delete(isAuthenticated,authorizeAdmin,deleteCourse);

//Delete Lecture
router
.route("/lecture")
.delete(isAuthenticated,authorizeAdmin,deleteLecture)



export default router;