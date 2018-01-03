var express = require('express');
var async = require('async');
var router = express.Router();

// ########## Routes ##########
// ----- Connect to Main Page
router.get('/', function (req, res, next) {

  res.render('checkingConnect', { title: 'Checking your Connect' });
});
// ############################

// ########## Module Exports ##########
module.exports = router;
// ####################################