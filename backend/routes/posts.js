
const timestamp=require('time-stamp');
const checkAuth = require("../middleware/check-auth");
const express = require("express");
const Crypto =  require('../models/crypto');
const serviceAccount = require('../serviceAccountKey.json');
var uniqid = require('uniqid');
const router = express.Router();
const cId=uniqid();
const admin = require("firebase-admin");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "************"
});
var db=admin.firestore();
router.post(
  "/",
  checkAuth,
  (req, res, next) => {

    console.log(req.body);
console.log(req.body.cName);
    const url = req.protocol + "://" + req.get("host");
    const post = new Crypto({
      cId:req.userData.userId,
      cName: req.body.cName,
      cTicker: req.body.cTicker,
      cPrice:req.body.cPrice,
      cDate:timestamp('YYYY:MM:DD'),

    });
    var data2 = {
      cryptoId:post.cId,
  cryptoName: post.cName,
  cryptoTicker: post.cTicker,
  cryptoPrice:post.cPrice,
  cryptoDate: timestamp('YYYY:MM:DD'),
};
console.log(data2.creator);
console.log(data2);
db.collection("Crypto").doc(cId).set(data2,{merge:true});

  }
);
module.exports = router;
