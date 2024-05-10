const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env.local') });
const express = require('express');
const cors = require('cors');
const { setVapidDetails, sendNotification, generateVAPIDKeys } = require('web-push');

const app = express();
const PORT = process.env.PORT || 4010;
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

const registerDB = {};

app.get('/', (req, res) => {
  res.status(200).json({ registerDB });
});

app.post('/subscribe', (req, res) => {
  const subscription = req.body;
  registerDB.subscription = subscription;
  console.log('Subscribe arrived!: ', subscription);

  res.status(201).json({
    status: 201,
    subscription,
    message: 'Subscription has been registered successfully.',
  });
});

app.get('/push', (req, res) => {
  // const queries = req.query;
  const queries = {
    title: 'Title',
    desc: `Description (${Math.random().toFixed(2)})`,
  };

  const payload = JSON.stringify({ ...queries });

  if (registerDB.subscription) {
    sendNotification(registerDB.subscription, payload).catch((err) => console.error(err));
    res.status(200).json({ registerDB, payload });
  } else {
    res.status(404).json({ message: 'No subscription data' });
  }
});

app.get('/manual', (req, res) => {
  const queries = req.query;
  if (Object.keys(queries).length === 0) {
    return res.send(`
      <h3>Query string is ommitted.</h3>
      <span>(e.g. <code>/?title=foo&desc=baz</code>)</span>
      `);
  }

  const newPayload = JSON.stringify({ ...queries });
  // Object: { id: '10', title: '20' }
  // JSON.stringify: {"id":"10","title":"20"}

  if (registerDB.subscription) {
    sendNotification(registerDB.subscription, newPayload).catch((err) =>
      console.error(err)
    );
    res.status(200).json({ ...registerDB, newPayload });
  } else {
    // res.setHeader('Content-Type', 'text/html');
    res.send('<h3>No subscription data.</h3>');
  }
});

app.listen(PORT, () => console.log('Server is running on PORT: %d', PORT));
