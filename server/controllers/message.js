import twilio from 'twilio';

// Twilio configuration
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

export const sendSms = (req, res) => {
    const { to, message } = req.body;
console.log(req.body)
    if (!to || !message) {
        return res.status(400).json({ error: 'Please provide a valid phone number and message.' });
    }

    client.messages
        .create({
            body: message,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: to
        })
        .then((message) => {
            console.log(`SMS sent: ${message.sid}`);
            res.status(200).json({ success: true, message: `SMS sent to ${to}` });
        })
        .catch((error) => {
            console.error('Error sending SMS:', error);
            res.status(500).json({ success: false, error: 'Failed to send SMS' });
        });
};

export const sendCall = (req, res) => {
    const { to } = req.body;
    console.log(req.body)
    if (!to) {
        return res.status(400).json({ error: 'Please provide a valid phone number.' });
    }

    client.calls
        .create({
            url: 'http://demo.twilio.com/docs/voice.xml',  // Example Twilio XML, you can customize this
            to: to,
            from: process.env.TWILIO_PHONE_NUMBER,
        })
        .then((call) => {
            console.log(`Call initiated: ${call.sid}`);
            res.status(200).json({ success: true, message: `Call initiated to ${to}` });
        })
        .catch((error) => {
            console.error('Error making call:', error);
            res.status(500).json({ success: false, error: 'Failed to initiate call' });
        });
};

export const sendLocationSms = (req, res) => {
    const { to, latitude, longitude } = req.body;
    console.log(req.body)
    if (!to || !latitude || !longitude) {
        return res.status(400).json({ error: 'Please provide a valid phone number and location.' });
    }

    const locationLink = `https://www.google.com/maps?q=${latitude},${longitude}`;
    const message = `Emergency! Here's the location: ${locationLink}`;

    client.messages
        .create({
            body: message,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: to
        })
        .then((message) => {
            console.log(`Location SMS sent: ${message.sid}`);
            res.status(200).json({ success: true, message: `Location sent to ${to}` });
        })
        .catch((error) => {
            console.error('Error sending SMS:', error);
            res.status(500).json({ success: false, error: 'Failed to send SMS' });
        });
};