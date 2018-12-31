var express = require('express');
var router = express.Router(); 
var body_parser = require('body-parser')

var passport = require('passport')

var jquery = require('jquery');
jquery.mobile = require('jquery-mobile');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/homepage', function(req,res){
  res.render('homepage', { title: 'Home'});
})

router.get('/register', function(req,res){
  res.render('register', {title: 'Register'});
})


module.exports = router;
