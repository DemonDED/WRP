const express = require('express');
const cors = require('cors');
const back = express();
const port = 3001;

back.use(cors({
  origin: '*',
}))

back.get('/first_stage', (req, res) => {
  res.sendFile(__dirname + '/monitoring.json');
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