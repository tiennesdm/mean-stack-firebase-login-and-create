const express = require("express");
const jwt = require("jsonwebtoken");
const firebaseClient = require('firebase').default;
const User = require("../models/user");

const serviceAccount = require('../serviceAccountKey.json');
var uniqid = require('uniqid');
const timestamp=require('time-stamp');

const router = express.Router();

const config = {
  apiKey: "******",
  authDomain: "friendly-chat-62e62.firebaseapp.com",
  databaseURL: "*****",
  projectId: "**",
  storageBucket: "****",
  messagingSenderId: "***"
};
firebaseClient.initializeApp(config)
router.post("/login",(req,res,next)=>{
  const body=req.body;
  console.log(body);
firebaseClient.auth().signInWithEmailAndPassword(req.body.email,req.body.password).then(function(){
  console.log(req.body.email);
  if (firebaseClient.auth().currentUser !== null)
          console.log("user id: " + firebaseClient.auth().currentUser.uid);
          fetchedUser=firebaseClient.auth().currentUser;
          tUser=firebaseClient.auth().currentUser;
          console.log(fetchedUser.uid);
          const token = jwt.sign(
            { email: fetchedUser.email, userId: fetchedUser.uid },
            "secret_this_should_be_longer",
            { expiresIn: "1h" }
          );
          console.log(token);
          res.status(200).json({
            token: token,
            expiresIn: 3600
          });
          next();
}).catch(err => {
  return res.status(401).json({
    message: "Invalid authentication credentials!"
  });
});

});






console.log("working");
module.exports = router;
