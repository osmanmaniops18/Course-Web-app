import { catchAsyncError } from '../middleware/catchAsyncError.js';
import { User } from '../models/User.js';
import ErrorHandler from '../utils/errorHandler.js';
import { instance } from '../server.js';
import crypto from 'crypto';
import { Payment } from '../models/Payment.js';

export const subscribe = catchAsyncError(async (req, resp, next) => {
  const user = await User.findById(req.user._id);
  if (user.role === 'admin')
    return next(new ErrorHandler("Admin Cant't buy subscrption", 400));

  const plan_id = process.env.PLAN_ID || 'plan_Lo2u1wxnnfNWJy';
  const subscription = await instance.subscriptions.create({
    plan_id,
    customer_notify: 1,
    total_count: 12,
  });

  user.subscrption.id = subscription.id;
  user.subscrption.status = subscription.status;

  await user.save();

  resp.status(200).json({
    succss: true,
    subscriptionId: subscription.id,
  });
});

export const paymentVerification = catchAsyncError(async (req, resp, next) => {
  const { razorpay_signature, razorpay_payment_id, razorpay_subscrption_id } =
    req.body;

  const user = await User.findById(req.user._id);

  const subscrption_id = user.subscrption.id;
  const generated_signature = crypto
    .createHmac('sha256', process.env.RAZORPAY_SECRET_KEY)
    .update(razorpay_payment_id + '|' + subscrption_id, 'utf8')
    .digest('hex');

  const isAutentic = generated_signature === razorpay_signature;

  if (!isAutentic)
    return resp.redirect(`${process.env.FRONTEND_URL}/paymentfail`);

  await Payment.create({
    razorpay_signature,
    razorpay_payment_id,
    razorpay_subscrption_id,
  });

  user.subscrption.status = 'active';
  await user.save();

  resp.redirect(
    `${process.env.FRONTEND_URL}/paymentsucess?reference=${razorpay_payment_id}`
  );
});

export const getRazorpayKey = catchAsyncError(async (req, resp, next) => {
  resp.status(200).json({
    success: true,
    key: process.env.RAZOR_API_KEY,
  });
});

export const cencelSubscrption = catchAsyncError(async (req, resp, next) => {
  const user = await User.findById(req.user._id);
  const subscrptionId = user.subscrption.id;
  let refund = false;
  await instance.subscriptions.cancel(subscrptionId);
  const payment = await Payment.findOne({
    razorpay_subscrption_id: subscrptionId,
  });

  const gap = Date.now() - payment.createdAt;
  const refundtime = process.env.REFUND_DAYS * 24 * 60 * 60 * 1000;

  if (refundtime > gap) {
   
    await instance.payments.refund(payment.razorpay_payment_id);
    refund = true;
  }

  await payment.deleteOne();
  user.subscrption.id=undefined;
  user.subscrption.status = 'inactive';

  resp.status(200).json({
    success: true,
    message: refund
      ? 'Subscrption Cancelled, You will recieve full Payments withhin 7 Days'
      : 'Subscrption Cancelled, Now refund initiated as subscrption was cancelled after 7 days',
  });
});
