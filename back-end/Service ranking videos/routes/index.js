var express = require('express');
var router = express.Router();

const axios = require('axios');

/* GET home page. */
router.get('/', function(req, res, next) {
  axios.get('http://localhost:7000/course/get-allcourse')
  .then(function (response) {
    // handle success
    console.log(response);
  })
  res.render('index', { title: 'Express' });
});

module.exports = router;
