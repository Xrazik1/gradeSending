const express = require('express');
const router = express.Router();
const path = require("path");

const options = {
  root: __dirname + '/../src',
  dotfiles: 'deny'
};

/* GET home page. */
router.get('/', (req, res) => {
  res.sendFile("index.html", options);
});

router.get('/bundle.js', (req, res) => {
  res.sendfile('bundle.js', options);
});



module.exports = router;
