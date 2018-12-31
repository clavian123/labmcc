var express = require('express');
var router = express.Router(); 
var mysql = require('mysql');
var body_parser = require('body-parser');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy
var jquery = require('jquery');
jquery.mobile = require('jquery-mobile');

var connection = mysql.createConnection({
  host : "eu-cdbr-west-02.cleardb.net",
  user : "bda3ab0092b9fe",
  password : "c903136f",
  database : "heroku_30631074981c2d1"
});

router.use(passport.initialize());

passport.use(new FacebookStrategy({
  clientID:'471522926585339',
  clientSecret : '826fb0a1d821e970341ed9d121e3ad70',
  callbackURL: 'https://bluecademy.herokuapp.com/authFacebook/done',
  profileFields: ['id', 'name', 'email', 'photos']
}, function(accessToken, refreshToken, profile, done){
  return done(null, profile);
}))

passport.serializeUser(function(profile,done){
  return done(null, profile);
})

passport.deserializeUser(function(profile,done){
  return done(null, profile);
})

router.get('/authFacebook', passport.authenticate('facebook'));
router.get('/authFacebook/done', passport.authenticate('facebook', {failureRedirect: '/'}),function(req,res){
  console.log(req.user)
  let fbid = req.user.id;
  let user = connection.query("SELECT * FROM user WHERE fbid=?", [fbid], (err, result) => {
    if (err) {
      res.redirect('/');
    }
    if (result) {
      if (result.length == 0) {
        //belom regis
        res.redirect('/register?fbid=' + fbid);
      }
      else {
        //udah regis
        res.redirect('/homepage?id=' + result[0].id);
      }
    }
  });
});

router.post('/register', (req, res) => {
  var username = req.body.username;
  var password = req.body.password;
  var fbid = req.body.fbid;

  connection.query("INSERT INTO user(fbid, name, password) VALUES (?, ?, ?)", [fbid, username, password], (err, result) => {
    if (err) {
      return res.json({msg: 'error'})
    } 
    else {
      return res.json({msg: 'success'});
    }
  });
  console.log(req.body.username);
})

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
