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
  var firstname = req.user.name.familyName;
  var lastname = req.user.name.givenName;

  if(req.user.emails!=null){
    var email = req.user.emails[0].value;
  }

  if(req.user!=null){
    res.redirect('/register?fbid='+fbid+'&name='+firstname+'&lastname='+lastname+'&email='+email)
  }
});

router.post('/register', (req, res) => {
  var username = req.body.username;
  var password = req.body.password;
  var fbid = req.body.fbid;
  var phone_number = req.body.phone_number;
  var email = req.body.email;

  console.log(username, password, fbid);
  connection.query('SELECT * FROM user WHERE email=?',[email], function(error, results){
    if (error){
      return res.json({message: error.message})
    }
    else{
      if (results.length===0){
        connection.query("INSERT INTO user(fbid, username, email, phone_number, password) VALUES (?, ?, ?, ?, ?)", [fbid, username,email, phone_number, password], (err, result) => {
          if (err) {
            return res.json({msg: 'error'})
          } 
          else {
            connection.query('SELECT id FROM user WHERE email=? AND password=?',[email,password],function(error,result){
              return res.json(result[0])
            })
          }
        });
        console.log(req.body.username);
      }
      else{
        return res.json({message:"Email already registered"});
      }
    }
  })
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
