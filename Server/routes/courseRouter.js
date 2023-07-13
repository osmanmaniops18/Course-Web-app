import express from 'express';
import {
  addLectures,
  createCourses,
  deleteCourses,
  deleteLecture,
  getAllCourses,
  getCourseLectures,
} from '../controller/courseController.js';
import singleUpload from '../middleware/multer.js';
import { isAuthirizeAdmin, isAuthirizeSubscriber, isAutunticated } from '../middleware/auth.js';

const router = express.Router();
//get all courses without lectures
router.route('/courses').get(getAllCourses);

//create courses for admin
router
  .route('/createcourse')
  .post(isAutunticated, isAuthirizeAdmin, singleUpload, createCourses);

router
  .route('/course/:id')
  .get(isAutunticated,isAuthirizeSubscriber, getCourseLectures)
  .post(isAutunticated, isAuthirizeAdmin, singleUpload, addLectures)
  .delete(isAutunticated, isAuthirizeAdmin, deleteCourses);

  router.route('/lecture').delete(isAutunticated,isAuthirizeAdmin,deleteLecture);
export default router;
