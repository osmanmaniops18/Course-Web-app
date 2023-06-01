import { catchAsyncError } from '../middleware/catchAsyncError.js';
import ErrorHandler from '../utils/errorHandler.js';
import { SendEmail } from '../utils/sendEmail.js';
import { Stats } from '../models/Stats.js';

export const contact = catchAsyncError(async (req, resp, next) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message)
    next(new ErrorHandler('Please provide all details', 403));

  const to = process.env.MY_MAIL;
  const subject = 'Contact From Course Bundler';
  const text = `I am ${name} and my email is ${email}. \n${message}`;
  await SendEmail(to, subject, text);
  resp.status(200).json({
    success: true,
    message: 'your message has been sent',
  });
});

export const courseRequest = catchAsyncError(async (req, resp, next) => {
  const { name, email, course } = req.body;
  if (!name || !email || !course)
    next(new ErrorHandler('Please provide all details', 403));

  const to = process.env.MY_MAIL;
  const subject = 'Requesting For a course on Course Bundler';
  const text = `I am ${name} and my email is ${email}. \n${course}`;
  await SendEmail(to, subject, text);
  resp.status(200).json({
    success: true,
    message: 'your message has been sent',
  });
});

export const adminStats = catchAsyncError(async (req, resp, next) => {
  const stats = await Stats.find({}).sort({ createdAt: 'desc' }).limit(12);

  const statsData = [];

  for (let index = 0; index < stats.length; index++) {
    statsData.unshift(stats[index]);
  }
  const requiredSize = 12 - stats.length;

  for (let index = 0; index < requiredSize; index++) {
    statsData.unshift({
      user: 0,
      subscrptions: 0,
      views: 0,
    });
  }

  const userCount = statsData[11].users;
  const subscrptionCount = statsData[11].subscrptions;
  const viewsCount = statsData[11].views;

  let usersProfit = true,
    viewsProfit = true,
    subscrptionsProfit = true;

    let usersPrecantage = 0,
    viewsPrecantage = 0,
    subscrptionsPrecantage = 0;

    if(statsData[10].users===0) usersPrecantage=userCount*100;
    if(statsData[10].views===0) viewsPrecantage=viewsCount*100;
    if(statsData[10].subscrptions===0) subscrptionsPrecantage=subscrptionCount*100;

    else{
        const difference={
            users:statsData[11].users-statsData[10].users,
            views:statsData[11].views-statsData[10].views,
            subscrption:statsData[11].subscrptions-statsData[10].subscrptions
        }

        usersPrecantage=difference.users/statsData[10].users*100
        viewsPrecantage=difference.views/statsData[10].views*100
        subscrptionsPrecantage=difference.subscrption/statsData[10].subscrptions*100

        if(usersPrecantage<0) usersProfit=false;
        if(viewsPrecantage<0) viewsProfit=false;
        if(subscrptionsPrecantage<0) subscrptionsProfit=false
    }

  resp.status(200).json({
    success: true,
    stats: statsData,
    userCount,
    subscrptionCount,
    viewsCount,
    usersProfit,
    viewsProfit,
    subscrptionsProfit,
    usersPrecantage,
    viewsPrecantage,
    subscrptionsPrecantage
  });
});
