const firebaseConfig = {
    apiKey: "AIzaSyCnbHVORHVXbB6jwlzFdOYoYcZxBKMoNOs",
    authDomain: "siga-ess.firebaseapp.com",
    projectId: "siga-ess",
    storageBucket: "siga-ess.appspot.com",
    messagingSenderId: "472548883315",
    appId: "1:472548883315:web:e2ffddf7d16d9ab72c2306",
    measurementId: "G-8WY0WPWXYD"
  };

var firebaseAdmin = require('firebase-admin');

firebaseAdmin.initializeApp({
credential: firebaseAdmin.credential.cert('cert.json'),
databaseURL: 'https://siga-ess.firebaseio.com'
});

var firebaseAdmin = require('firebase-admin');
var express = require('express');
var router = express.Router();
var authenticate = require('my-authentication-library');

router.post('/token', function(request, response, next) {
  if(authenticate(request)){
    firebaseAdmin.auth().createCustomToken(request.body.login).then(function(token){
      response.json({ token: token });
    })
    .catch(function(error) {
      res.status(500).json({error: "Error during token creation"});
    });
  } else {
    res.status(401).json({error: "Invalid login or password"});
  }
});
module.exports = router;