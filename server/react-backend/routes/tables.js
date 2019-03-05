const express = require('express');



const router = express.Router();

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


router.post('/', function(req, res, next) {
 res.end('200 OK');
});



module.exports = router;
