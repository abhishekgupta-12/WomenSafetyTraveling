import express from 'express';
import { sendCall, sendLocationSms, sendSms } from '../controllers/message.js';

const router = express.Router();

// Define separate routes for sending SMS and making a call
router.post('/send-sms', sendSms);
router.post('/send-call', sendCall);
router.post('/send-location-sms', sendLocationSms);

export default router;
