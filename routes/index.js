var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  var firstMicex = '101.21';
  var firstM2 = '363';
  var lastMicex = '1360';
  var lastM2 = '30689' ;
  var currentMicexCleared = 100 * lastMicex / lastM2 / (firstMicex / firstM2);
  var params = {
      title: 'Micex Cleared',
      currentMicexCleared: currentMicexCleared,
      lastMicex: lastMicex
  };   
  res.render('index', params);
});

module.exports = router;
