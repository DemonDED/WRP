const express = require('express');
const cors = require('cors');
const back = express();
const port = 3002;

back.use(cors({
  origin: '*',
}))

back.post('/test', (req, res) => {
  res.sendFile(__dirname + '/monitoring.json');
  res.send('ping_nok');
  console.log('ping ok')
})

back.post('/auth', (res, req) => {
  if (res = '{"username": "admin", "password": "Ktubjy"}') {
    req.send('{"token":"successful"}');
  } else {
    req.send('{"token": "denied"}');
  }
})

back.listen( port, () => {
  console.log('Back is established...');
})