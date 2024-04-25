const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env.local') });
const express = require('express');
const cors = require('cors');
const { setVapidDetails, sendNotification, generateVAPIDKeys } = require('web-push');

const app = express();
const PORT = process.env.PORT || 4000;
// VAPID keys should be generated only once.
// const vapidKeys = generateVAPIDKeys();
// console.log(vapidKeys.publicKey, vapidKeys.privateKey);

app.use(cors());
app.use(express.json());

setVapidDetails(
  'mailto:jedi@dongrim.com',
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

app.get('/', (req, res) => {
  res.status(200).end('ok');
});

let dummy = {};
app.post('/subscribe', (req, res) => {
  const subscription = req.body;
  const payload = JSON.stringify({ title: 'Test-title' });

  sendNotification(subscription, payload).catch((err) => console.error(err));

  dummy.subscription = subscription;
  dummy.payload = payload;

  res.status(201).end();
});

app.get('/push', (req, res) => {
  if (!req.query)
    return res.status(204).send('Query string is ommitted. (/?title=foo&desc=baz)');
  const newPayload = JSON.stringify({ ...req.query });

  if (dummy.subscription) {
    sendNotification(dummy.subscription, newPayload).catch((err) => console.error(err));
    res.status(200).json({ ...dummy, newPayload });
  } else {
    // res.setHeader('Content-Type', 'text/html');
    res.status(204).send('No subscription data.');
  }
});

app.listen(PORT, () => console.log('Server is running on PORT: %d', PORT));
