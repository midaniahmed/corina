const express = require('express');
const favicon = require('serve-favicon');
const app = express();
const port = process.env.PORT || 3000;

if (process.env.NODE_ENV === 'production') {
  app.all('*', (req, res, next) => {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      res.redirect(`${process.env.PENTUGRAM_URL}${req.url}`);
    } else { next(); }
  });
}

app.use(favicon(__dirname + '/dist/favicon.png'));

app.get('/bundle.js', function (req, res) {
  res.set('Content-Encoding', 'x-gzip');
  res.set('Content-Type', 'application/x-gzip');
  res.sendFile(__dirname + '/public/bundle.js.gz');
  // res.sendFile(__dirname + '/public/bundle.js');
});

app.use(express.static('public'));

app.get('/*', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});