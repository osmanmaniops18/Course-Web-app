import jwt from 'jsonwebtoken';
import { catchAsyncError } from './catchAsyncError.js';
import ErrorHandler from '../utils/errorHandler.js';
import { User } from '../models/User.js';

export const isAutunticated = catchAsyncError(async (req, resp, next) => {
  const { token } = req.cookies;

  if (!token)
    return next(new ErrorHandler('Please Login To Access The Resources', 401));

  const decode = jwt.verify(token, process.env.JWT_SECRETKEY);

  req.user = await User.findById(decode._id);

  next();
});

export const isAuthirizeSubscriber = (req, resp, next) => {
  if (req.user.subscrption.status !== 'active' && req.user.role !== 'admin')
    return next(
      new ErrorHandler(
        "Only Subscriber can Access this resources",
        403
      )
    );

  next();
};

export const isAuthirizeAdmin = (req, resp, next) => {
  if (req.user.role !== 'admin')
    return next(
      new ErrorHandler(
        `${req.user.role} is not allowed to access this resources`,
        403
      )
    );

  next();
};
