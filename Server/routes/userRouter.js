import express from 'express';
import {
  addToPlayList,
  changepassword,
  deleteMyProfile,
  deleteUser,
  forgetPassword,
  getAllUsers,
  getMyProfile,
  login,
  logout,
  registerUser,
  removeFromPlayList,
  resetPassword,
  updateProfile,
  updateProfilePic,
  updateUserRole,
} from '../controller/userController.js';
import { isAuthirizeAdmin, isAutunticated } from '../middleware/auth.js';
import singleUpload from '../middleware/multer.js';

const router = express.Router();

router.route('/register').post(singleUpload, registerUser);

router.route('/login').post(login);
router.route('/logout').get(logout);
router.route('/me').get(isAutunticated, getMyProfile);
router.route('/me').delete(isAutunticated, deleteMyProfile);
router.route('/changepassword').put(isAutunticated, changepassword);
router.route('/updateprofile').put(isAutunticated, updateProfile);
router
  .route('/updateprofilepic')
  .put(isAutunticated, singleUpload, updateProfilePic);
router.route('/forgetpassword').post(forgetPassword);
router.route('/resetpassword/:token').put(resetPassword);
router.route('/addtoplaylist').post(isAutunticated, addToPlayList);
router.route('/removefromplaylist').delete(isAutunticated, removeFromPlayList);
router.route('/admin/users').get(isAutunticated, isAuthirizeAdmin, getAllUsers);
router
  .route('/admin/user/:id')
  .put(isAutunticated, isAuthirizeAdmin, updateUserRole)
  .delete(isAutunticated, isAuthirizeAdmin, deleteUser);

export default router;
