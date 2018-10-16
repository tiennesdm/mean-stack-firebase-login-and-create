const mongoose = require('mongoose');
autoIncrement = require('mongoose-auto-increment');

const cryptoSchema = mongoose.Schema({
  cId:{ type: String, required: true },
  cTicker: { type: String, required: true },
  cName: { type: String, required: true },
  cPrice: { type : String, required : true},
  cDate : {type : Date, required : true}
});

module.exports = mongoose.model('Crypto', cryptoSchema);
